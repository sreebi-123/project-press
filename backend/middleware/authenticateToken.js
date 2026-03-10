import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt; // Get token from HttpOnly cookie
  //   console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export default authenticateToken;
