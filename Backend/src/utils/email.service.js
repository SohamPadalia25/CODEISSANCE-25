// to genrate otp
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or "outlook", "yahoo", or custom SMTP
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password (not your Gmail password)
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Blood Bank App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email error: ", err);
    throw err;
  }
};
