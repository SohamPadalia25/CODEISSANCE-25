import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "donor", "hospital_admin", "blood_bank_admin"],
      required: true,
    },
    personalInfo: {
      dateOfBirth: { type: Date },
      gender: { type: String, enum: ["male", "female", "other"] },
      contactNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || /\d{10}/.test(v);
          },
          message: 'Contact number should be 10 digits'
        }
      },
      alternateNumber: { type: String },
      profilePicture: { type: String },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        country: { type: String, default: "India" }
      },
      emergencyContacts: [  
    {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /\d{10}/.test(v);
          },
          message: 'Emergency contact number should be 10 digits'
        }
      }
    }
  ]
    },
    organizationInfo: {
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'organizationInfo.organizationType'
      },
      organizationType: {
        type: String,
        enum: ['Hospital', 'BloodBank'],
        required: function() {
          return ['hospital_admin', 'blood_bank_admin'].includes(this.role);
        }
      },
      organizationName: { 
        type: String,
        required: function() {
          return ['hospital_admin', 'blood_bank_admin'].includes(this.role);
        }
      },
      designation: { 
        type: String,
        required: function() {
          return ['hospital_admin', 'blood_bank_admin'].includes(this.role);
        }
      },
      department: { type: String },
      employeeId: { type: String },
      joiningDate: { type: Date },
      permissions: [{
        module: {
          type: String,
          enum: ["inventory", "requests", "donors", "staff", "reports", "alerts", "analytics", "patients"]
        },
        actions: [{
          type: String,
          enum: ["create", "read", "update", "delete", "approve", "reject"]
        }]
      }]
    },
    donorProfile: {
      donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor"
      },
      registrationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected", "incomplete"],
        default: "incomplete"
      },
      registrationDate: { type: Date }
    },
    accountStatus: {
      isActive: { type: Boolean, default: true },
      isVerified: { type: Boolean, default: true }, // ✅ Auto-verified
      emailVerified: { type: Boolean, default: true }, // ✅ Auto-verified
      phoneVerified: { type: Boolean, default: false },
      lastLogin: { type: Date },
      loginAttempts: { type: Number, default: 0 },
      lockUntil: { type: Date }
    },
    preferences: {
      language: { type: String, default: "en" },
      timezone: { type: String, default: "Asia/Kolkata" },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        emergencyOnly: { type: Boolean, default: false }
      },
      dashboardTheme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "light"
      }
    },
    refreshToken: { type: String },
    apiKeys: [{
      keyName: { type: String },
      keyValue: { type: String },
      permissions: [{ type: String }],
      createdAt: { type: Date, default: Date.now },
      expiresAt: { type: Date },
      isActive: { type: Boolean, default: true }
    }]
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Check if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
      organizationType: this.organizationInfo?.organizationType,
      organizationId: this.organizationInfo?.organizationId
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Check user permissions
userSchema.methods.hasPermission = function(module, action) {
  if (this.role === 'admin') return true;
  
  const permission = this.organizationInfo?.permissions?.find(p => p.module === module);
  return permission?.actions?.includes(action) || false;
};

// Increment login attempts
userSchema.methods.incLoginAttempts = async function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: {
        loginAttempts: 1
      },
      $unset: {
        lockUntil: 1
      }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // If we hit max attempts and it's not locked already, lock the account
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = async function() {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockUntil: 1
    }
  });
};

export const User = mongoose.model("User", userSchema);
