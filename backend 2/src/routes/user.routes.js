import { Router } from "express";
import {
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
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, restrictTo, checkAccountStatus } from "../middlewares/auth.middleware.js";

const router = Router();

// 🔐 PUBLIC ROUTES (No authentication required)
// These routes should NEVER have authentication middleware
router.post("/register", 
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  registerUser
);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// 🔒 PROTECTED ROUTES (Authentication required)
// Apply middleware only to these specific routes
router.get("/profile", verifyJWT, checkAccountStatus, getCurrentUser);
router.patch("/profile/personal", verifyJWT, checkAccountStatus, updatePersonalInfo);
router.patch("/profile/picture", verifyJWT, checkAccountStatus, upload.single("profilePicture"), updateProfilePicture);
router.patch("/profile/preferences", verifyJWT, checkAccountStatus, updatePreferences);
router.patch("/profile/organization", 
  verifyJWT, 
  checkAccountStatus,
  restrictTo("hospital_admin", "blood_bank_admin"),
  updateOrganizationInfo
);

// Password Management
router.patch("/change-password", verifyJWT, checkAccountStatus, changeCurrentPassword);

// Dashboard
router.get("/dashboard/stats", verifyJWT, checkAccountStatus, getDashboardStats);

// API Key Management (Admin roles only)
router.post("/api-keys", verifyJWT, checkAccountStatus, restrictTo("admin", "hospital_admin", "blood_bank_admin"), generateApiKey);
router.get("/api-keys", verifyJWT, checkAccountStatus, restrictTo("admin", "hospital_admin", "blood_bank_admin"), getApiKeys);
router.patch("/api-keys/:keyId/deactivate",
  verifyJWT, 
  checkAccountStatus,
  restrictTo("admin", "hospital_admin", "blood_bank_admin"),
  deactivateApiKey
);

// User Management (Super Admin only)
router.get("/admin/users", verifyJWT, checkAccountStatus, restrictTo("admin"), getAllUsers);
router.patch("/admin/users/:userId/toggle-status", verifyJWT, checkAccountStatus, restrictTo("admin"), toggleUserStatus);

// Logout
router.post("/logout", verifyJWT, logoutUser);

export default router;
