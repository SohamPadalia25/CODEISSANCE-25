import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { Donor } from '../models/donor.model.js';
import { Hospital } from '../models/hospital.model.js';
import { BloodBank } from '../models/bloodBank.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Helper function to generate tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.accountStatus.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal server error while generating tokens");
  }
};

// Register User - Auto-verified, no email required
const registerUser = asyncHandler(async (req, res) => {
  console.log('Registration attempt:', { role: req.body.role, hasOrgData: !!req.body.organizationData });
  
  const { fullName, username, email, password, role, organizationData,personalInfo } = req.body;

  // Validation
  if ([fullName, username, email, password, role].some(field => !field?.trim())) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Validate role
  const validRoles = ["admin", "donor", "hospital_admin", "blood_bank_admin"];
  if (!validRoles.includes(role)) {
    throw new ApiError(400, "Invalid role specified");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // Password validation
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle profile picture upload with validation
  let profilePictureUrl = null;
  if (req.files?.profilePicture) {
    const profilePicture = req.files.profilePicture[0];
    
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(profilePicture.mimetype)) {
      throw new ApiError(400, "Invalid image format. Only JPEG, JPG, PNG allowed");
    }
    
    if (profilePicture.size > maxSize) {
      throw new ApiError(400, "Image size must be less than 5MB");
    }

    const uploadResult = await uploadOnCloudinary(profilePicture.path);
    if (!uploadResult?.url) {
      throw new ApiError(500, "Failed to upload profile picture");
    }
    profilePictureUrl = uploadResult.url;
  }

  // Create user object - password will be hashed by model pre-save hook
  const userData = {
    fullName,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password, // ✅ Raw password - will be hashed by model
    role,
    personalInfo,
    accountStatus: {
      isActive: true,
      isVerified: true, // ✅ Auto-verified for now
      emailVerified: true, // ✅ Auto-verified for now
      phoneVerified: false
    }
  };

  // Handle organization-specific data
  if (role === 'hospital_admin' || role === 'blood_bank_admin') {
    if (!organizationData) {
      throw new ApiError(400, "Organization data required for admin roles");
    }

    // Validate required organization fields - make more flexible
    const requiredOrgFields = ['organizationName', 'designation'];
    for (const field of requiredOrgFields) {
      if (!organizationData[field]?.trim()) {
        throw new ApiError(400, `Organization ${field} is required`);
      }
    }

    userData.organizationInfo = {
      organizationType: role === 'hospital_admin' ? 'Hospital' : 'BloodBank',
      organizationName: organizationData.organizationName,
      designation: organizationData.designation,
      department: organizationData.department || 'General',
      employeeId: organizationData.employeeId || `EMP${Date.now()}`,
      joiningDate: new Date(),
      permissions: organizationData.permissions || getDefaultPermissions(role)
    };

    // Only validate organization exists if ID provided
    if (organizationData.organizationId) {
      try {
        const Organization = role === 'hospital_admin' ? Hospital : BloodBank;
        const orgExists = await Organization.findById(organizationData.organizationId);
        if (!orgExists) {
          throw new ApiError(404, "Organization not found");
        }
        userData.organizationInfo.organizationId = organizationData.organizationId;
      } catch (error) {
        // If model doesn't exist or other error, just log and continue without organizationId
        console.warn('Organization validation skipped:', error.message);
      }
    }
  }

  // Create user
  let user;
  try {
    console.log('Creating user with data:', { 
      role, 
      hasOrgInfo: !!userData.organizationInfo,
      orgType: userData.organizationInfo?.organizationType 
    });
    user = await User.create(userData);
  } catch (error) {
    console.error('User creation failed:', error);
    throw new ApiError(500, `User creation failed: ${error.message}`);
  }

  // Initialize donor profile for donors
  if (role === 'donor') {
    user.donorProfile = {
      registrationStatus: 'incomplete',
      registrationDate: new Date()
    };
    await user.save();
  }

  // Generate verification token and send email (implement this)
  // await sendVerificationEmail(user.email, user._id);

  // Get created user without sensitive data
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});

// Helper function for default permissions
function getDefaultPermissions(role) {
  const basePermissions = [
    { module: "inventory", actions: ["create", "read", "update", "delete"] },
    { module: "requests", actions: ["create", "read", "update", "approve", "reject"] },
    { module: "donors", actions: ["read", "update"] },
    { module: "reports", actions: ["read"] },
    { module: "alerts", actions: ["create", "read", "update"] }
  ];

  // Role-specific permissions
  if (role === 'hospital_admin') {
    return [...basePermissions, 
      { module: "patients", actions: ["read", "create", "update"] }
    ];
  }
  return basePermissions;
}

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // Find user
  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Check if account is locked
  if (user.isLocked) {
    throw new ApiError(423, "Account is locked due to too many failed login attempts. Try again later.");
  }

  // Check if account is active
  if (!user.accountStatus.isActive) {
    throw new ApiError(403, "Account is deactivated. Please contact support.");
  }

  // Validate password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    // Increment login attempts
    await user.incLoginAttempts();
    throw new ApiError(401, "Invalid credentials");
  }

  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // Get logged in user data
  let loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .populate('donorProfile.donorId')
    .populate('organizationInfo.organizationId');

  // Cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
        dashboard: getDashboardRoute(user.role)
      }, "User logged in successfully")
    );
});

// Helper function to get dashboard route
const getDashboardRoute = (role) => {
  const dashboardRoutes = {
    admin: '/admin/dashboard',
    donor: '/donor/dashboard',
    hospital_admin: '/hospital/dashboard',
    blood_bank_admin: '/blood-bank/dashboard'
  };
  return dashboardRoutes[role] || '/dashboard';
};

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  };

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// Change Current Password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both old and new passwords are required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password -refreshToken")
    .populate('donorProfile.donorId')
    .populate('organizationInfo.organizationId');

  return res.status(200).json(
    new ApiResponse(200, user, "Current user fetched successfully")
  );
});

// Update Personal Info
const updatePersonalInfo = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address, dateOfBirth, gender } = req.body;

  const updateData = {};
  
  if (fullName) updateData.fullName = fullName;
  if (email) {
    // Check if email already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: req.user._id } 
    });
    if (existingUser) {
      throw new ApiError(409, "Email already in use");
    }
    updateData.email = email.toLowerCase();
  }
  if (phone) updateData['personalInfo.phone'] = phone;
  if (address) updateData['personalInfo.address'] = address;
  if (dateOfBirth) updateData['personalInfo.dateOfBirth'] = new Date(dateOfBirth);
  if (gender) updateData['personalInfo.gender'] = gender;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Personal information updated successfully")
  );
});

// Update Profile Picture
const updateProfilePicture = asyncHandler(async (req, res) => {
  const profilePictureLocalPath = req.file?.path;

  if (!profilePictureLocalPath) {
    throw new ApiError(400, "Profile picture file is missing");
  }

  const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

  if (!profilePicture.url) {
    throw new ApiError(400, "Error while uploading profile picture");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        'personalInfo.profilePicture': profilePicture.url
      }
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Profile picture updated successfully")
  );
});

// Update User Preferences
const updatePreferences = asyncHandler(async (req, res) => {
  const { language, timezone, notifications, privacy } = req.body;

  const updateData = {};
  if (language) updateData['preferences.language'] = language;
  if (timezone) updateData['preferences.timezone'] = timezone;
  if (notifications) updateData['preferences.notifications'] = notifications;
  if (privacy) updateData['preferences.privacy'] = privacy;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Preferences updated successfully")
  );
});

// Update Organization Info (for admin users)
const updateOrganizationInfo = asyncHandler(async (req, res) => {
  const { designation, department, permissions } = req.body;

  if (!['hospital_admin', 'blood_bank_admin'].includes(req.user.role)) {
    throw new ApiError(403, "Only organization admins can update organization info");
  }

  const updateData = {};
  if (designation) updateData['organizationInfo.designation'] = designation;
  if (department) updateData['organizationInfo.department'] = department;
  if (permissions) updateData['organizationInfo.permissions'] = permissions;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Organization information updated successfully")
  );
});

// Generate API Key
const generateApiKey = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  if (!name) {
    throw new ApiError(400, "API key name is required");
  }

  const apiKey = {
    name,
    key: jwt.sign(
      { userId: req.user._id, type: 'api_key' },
      process.env.API_KEY_SECRET,
      { expiresIn: '365d' }
    ),
    permissions: permissions || ['read'],
    isActive: true,
    createdAt: new Date()
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { 'apiKeys': apiKey } },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, { apiKey }, "API key generated successfully")
  );
});

// Get API Keys
const getApiKeys = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("apiKeys");
  
  return res.status(200).json(
    new ApiResponse(200, user.apiKeys, "API keys fetched successfully")
  );
});

// Deactivate API Key
const deactivateApiKey = asyncHandler(async (req, res) => {
  const { keyId } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id, 'apiKeys._id': keyId },
    { $set: { 'apiKeys.$.isActive': false } },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "API key not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "API key deactivated successfully")
  );
});

// Get All Users (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  const { page = 1, limit = 10, role, status } = req.query;
  
  const filter = {};
  if (role) filter.role = role;
  if (status) filter['accountStatus.isActive'] = status === 'active';

  const users = await User.find(filter)
    .select("-password -refreshToken")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }, "Users fetched successfully")
  );
});

// Toggle User Status (Admin only)
const toggleUserStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  const { userId } = req.params;
  
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.accountStatus.isActive = !user.accountStatus.isActive;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { isActive: user.accountStatus.isActive }, 
      `User ${user.accountStatus.isActive ? 'activated' : 'deactivated'} successfully`)
  );
});

// Get Dashboard Stats
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = {
    totalUsers: 0,
    activeUsers: 0,
    donors: 0,
    hospitals: 0,
    bloodBanks: 0
  };

  if (req.user.role === 'admin') {
    stats.totalUsers = await User.countDocuments();
    stats.activeUsers = await User.countDocuments({ 'accountStatus.isActive': true });
    stats.donors = await User.countDocuments({ role: 'donor' });
    stats.hospitals = await User.countDocuments({ role: 'hospital_admin' });
    stats.bloodBanks = await User.countDocuments({ role: 'blood_bank_admin' });
  }

  return res.status(200).json(
    new ApiResponse(200, stats, "Dashboard stats fetched successfully")
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updatePersonalInfo,
  updateProfilePicture,
  updatePreferences,
  updateOrganizationInfo,
  generateApiKey,
  getApiKeys,
  deactivateApiKey,
  getAllUsers,
  toggleUserStatus,
  getDashboardStats
};
