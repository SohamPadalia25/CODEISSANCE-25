import { sendEmail } from "../utils/email.js";

export const requestOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // TODO: Save OTP in DB or Redis

    await sendEmail(
      email,
      "Your OTP Code",
      `<h2>Blood Bank Login</h2><p>Your OTP is: <b>${otp}</b></p>`
    );

    res.json({ message: "OTP sent successfully", otp }); // send without otp in real
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};
