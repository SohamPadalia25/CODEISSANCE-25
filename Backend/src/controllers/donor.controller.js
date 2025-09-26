import * as donorService from "../service/donor.service.js";

export const requestOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await donorService.requestOtp({ email });
    res.json({ message: "OTP sent successfully", donorId: result.donorId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { donorId, otp } = req.body;
    const token = await donorService.verifyOtp({ donorId, otp });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
