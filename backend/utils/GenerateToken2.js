import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Load secret keys from .env
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Define all functions inside an object
const authUtils = {
  // Generate access token (short-lived)
  generateAccessToken: (payload) =>
    jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" }),

  // Generate refresh token (long-lived)
  generateRefreshToken: (payload) =>
    jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" }),

  // Set the tokens as HTTP-only cookies
  setAuthCookies: (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  },

  // Clear the cookies when logging out
  clearAuthCookies: (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }
};

// Export the object
export default authUtils;
