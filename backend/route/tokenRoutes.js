import { Router } from "express";
import { generateToken } from "../controller/tokenController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRoles from "../middleware/authMiddleware.js";


const tokenRouter = Router();

// Route: POST /api/token/tokengenerate
// Description: Generate a new token for a customer
tokenRouter.route("/tokengenerate").post(authenticateToken, authorizeRoles("admin"),generateToken);

export default tokenRouter;
