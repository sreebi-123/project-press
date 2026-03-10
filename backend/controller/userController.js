import asyncHandler from "express-async-handler";
import User from "../model/userSchema.js";
import generateToken from "../utils/generateToken.js";
import { generateOtp, sendOtpEmail } from "../utils/otpService.js";
import { printingPressunit } from "../model/printingPressunit.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.user);
  const { shopId } = req.user;

  let userExists = await User.findOne({ email });

  if (userExists) {
    if (userExists.isVerified) {
      res.status(400);
      throw new Error("Email already registered");
    } else {
      // Optionally update existing unverified user or return early
      await User.deleteOne({ _id: userExists._id }); // Or update password/name/role
    }
  }
  /*
  if (userExists)
    return res.status(400).json({ message: "User already exists" });
  */

  const user = await User.create({
    name,
    email,
    password,
    role,
    shopId,
  });
  /*
  const payload = { 
    userId: user._id,
    shopId: user.shopId,
    role: user.role,
  };
  */
  // generateToken(res, payload);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// Resend OTP
export const resendUserOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  await sendOtpEmail(email, otp);

  res.status(200).json({ message: "OTP resent" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const payload = {
      userId: user._id,
      shopId: user.shopId,
      role: user.role,
    };

    generateToken(res, payload);

    if (user.role !== "superadmin") {
      const shopId = user.shopId;
      const shop = await printingPressunit.findById(shopId);
      // console.log(shop);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
        subscription: shop.subscription,
      });
    } else {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const shopId = req.user?.shopId;
  const users = await User.find({
    role: { $ne: "superadmin" },
    isVerified: true,
    shopId: shopId,
  });
  res.status(200).json(users);
});

export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    console.log(user.name, user.email);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateDesignerAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;

    const user = await User.findById(req.user._id);
    if (!user || user.role !== "designer") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    user.isAvailable = isAvailable;
    await user.save();

    res.status(200).json({ message: "Availability updated", isAvailable });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
