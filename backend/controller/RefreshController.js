import jwt from "jsonwebtoken";
import authUtils from "../utils/GenerateToken2.js"; // adjust the path if needed

const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = authUtils.generateAccessToken({
      _id: decoded._id,
      email: decoded.email,
      role: decoded.role,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ success: true });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};



// Export functions at the end
export { refreshAccessToken };
