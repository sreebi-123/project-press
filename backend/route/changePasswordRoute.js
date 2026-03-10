import express from "express";
import { changePassword } from "../controller/changingPassword.js";
const router = express.Router();

router.post("/", changePassword);

export default router;
