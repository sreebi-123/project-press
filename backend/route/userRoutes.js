import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  updateDesignerAvailability,
} from "../controller/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRoles from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(authenticateToken, authorizeRoles("admin"), registerUser)
  .get(authenticateToken, authorizeRoles("admin"), getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.patch(
  "/designer-availability",
  authenticateToken,
  authorizeRoles("designer"),
  updateDesignerAvailability
);
router
  .route("/profile")
  .get(authenticateToken, authorizeRoles("admin"), getUserProfile)
  .put(authenticateToken, updateUserProfile);

router
  .route("/:id")
  .delete(authenticateToken, authorizeRoles("admin"), deleteUser)
  .get(authenticateToken, authorizeRoles("admin"), getUserByID)
  .put(authenticateToken, authorizeRoles("admin"), updateUser);

export default router;
