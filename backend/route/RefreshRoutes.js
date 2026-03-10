import express from "express";
import { refreshAccessToken } from "../controller/RefreshController.js";

const refreshRouter = express.Router();

refreshRouter.route("/refresh").post(refreshAccessToken);


export default refreshRouter;
