import sendEmail from "./sendEmail.js";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const sendOtpEmail = async (email, otp) => {
  const message = `Your OTP is ${otp}. It will expire in 10 minutes.`;
  await sendEmail(email, message);
};
