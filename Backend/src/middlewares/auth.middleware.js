import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// 🔐 BASIC JWT VERIFICATION
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = 
      req.cookies?.accessToken || 
      (req.header("Authorization")?.startsWith("Bearer ")
        ? req.header("Authorization").replace("Bearer ", "")
        : null);

    if (!token) {
      throw new ApiError(401, "Access token is required");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id)
      .select("-password -refreshToken")
      .populate('donorProfile.donorId')
      .populate('organizationInfo.organizationId');

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

// 🔐 ROLE-BASED ACCESS CONTROL
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to perform this action");
    }
    next();
  };
};

// 🔐 ACCOUNT STATUS CHECK
export const checkAccountStatus = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user.accountStatus.isActive) {
    throw new ApiError(403, "Account is deactivated. Please contact support.");
  }

  if (user.isLocked) {
    throw new ApiError(423, "Account is locked due to multiple failed login attempts");
  }

  next();
});

// 🔐 ORGANIZATION ACCESS CHECK
export const checkOrganizationAccess = (organizationType) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    if (user.role === 'admin') return next();

    if (user.organizationInfo?.organizationType !== organizationType) {
      throw new ApiError(403, `Access denied. ${organizationType} access required.`);
    }

    next();
  });
};

// 🔐 PERMISSION-BASED ACCESS CONTROL
export const checkPermission = (module, action) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    if (user.role === 'admin') return next();

    if (!user.hasPermission(module, action)) {
      throw new ApiError(403, `You do not have permission to ${action} ${module}`);
    }

    next();
  });
};
