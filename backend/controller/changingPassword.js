import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";
import { OnlineCustomer } from "../model/onlineCustomer.js";
import { printingPressunit } from "../model/printingPressunit.js";

const modelMap = {
  user: User,
  customer: OnlineCustomer,
  admin: printingPressunit,
};

export const changePassword = asyncHandler(async (req, res) => {
  const { email, role, oldPassword, newPassword } = req.body;

  const Model = modelMap[role];
  if (!Model) {
    return res.status(400).json({ message: "Invalid role" });
  }
  const user = await Model.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Use model method if available
  const isMatch = user.comparePassword
    ? await user.comparePassword(oldPassword)
    : await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect old password" });
  }

  user.password = newPassword; // ⛔ Don't hash manually
  await user.save(); // ✅ Let model hook hash it

  res.status(200).json({ message: "Password updated successfully" });
});
