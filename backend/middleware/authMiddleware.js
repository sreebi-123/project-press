import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// dotenv.config();

// Protect Routes Middleware
// const protect = (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ message: 'Not authorized, no token' });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Not authorized, token failed' });
//     }
// };

// Authorize Roles Middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: 'Not authorized or user role missing' });
          }
      
      
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user.role} not allowed` });
        }
        next();
    };
};

export default authorizeRoles ;
