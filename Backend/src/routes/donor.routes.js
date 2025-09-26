import express from "express";
import { requestOtpController, verifyOtpController } from "../controllers/donor.controller.js";

const router = express.Router();

router.post("/login/request-otp", requestOtpController);
router.post("/login/verify-otp", verifyOtpController);

export default router;
