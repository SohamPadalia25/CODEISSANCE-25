import { Donor } from "../models/donor.model.js";
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

let otpStore = {}; // temp, for production use Redis or DB

export const requestOtp = async ({ email }) => {
  const donor = await User.findOne({
    $or: [
      // { "personalInfo.contactNumber": phone },
      // { "personalInfo.emergencyContact.phone": phone },
      { "email": email },
    ],
  });

  if (!donor) throw new Error("Donor not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[donor._id] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Blood Bank" <${process.env.EMAIL_USER}>`,
    to: email || donor.personalInfo.emergencyContact.phone,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  return { donorId: donor._id };
};

export const verifyOtp = async ({ donorId, otp }) => {
  const stored = otpStore[donorId];
  if (!stored) throw new Error("OTP expired or invalid");

  if (Date.now() > stored.expires) {
    delete otpStore[donorId];
    throw new Error("OTP expired");
  }

  if (otp !== stored.otp) throw new Error("Invalid OTP");

  // OTP is valid → generate JWT
  const token = jwt.sign({ donorId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  delete otpStore[donorId];
  return token;
};
