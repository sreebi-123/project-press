import asyncHandler from "express-async-handler";
import { printingPressunit } from "../model/printingPressunit.js";
import User from "../model/userSchema.js";
import { OnlineCustomer } from "../model/onlineCustomer.js";
import { generateOtp, sendOtpEmail } from "../utils/otpService.js";

const modelMap = {
  user: User,
  customer: OnlineCustomer,
  admin: printingPressunit,
};

export const sendOtp = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  console.log(role);
  const Model = modelMap[role];
  console.log(Model);
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  const user = await Model.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOtp();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min
  console.log(otp);
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();
  await sendOtpEmail(email, otp);

  res.status(200).json({ message: "OTP resent" });
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp, role } = req.body;
  const Model = modelMap[role];
  console.log(Model);
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  const user = await Model.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Verified successfully" });
});
