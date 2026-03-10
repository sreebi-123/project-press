import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import ngrok from "@ngrok/ngrok";
import onlineCustomerRouter from "./route/onlineCustomerRoute.js";
import printingUnitRouter from "./route/printingPressunitRoute.js";
import orderRouter from "./route/OrderRoutes.js";
import tokenRouter from "./route/tokenRoutes.js";
import userRoutes from "./route/userRoutes.js";
import reviewRouter from "./route/reviewRoute.js";
import refresh from "./route/RefreshRoutes.js";
import paymentRoutes from "./route/paymentRoute.js";
import otpRoutes from "./route/otpRoutes.js";
import changePasswordRoutes from "./route/changePasswordRoute.js";
import invoiceRoutes from "./route/invoiceRoutes.js"; 


import { errorHandler } from "./middleware/errorMiddleware.js";
import { notFound } from "./middleware/errorMiddleware.js";

import path from "path";
import { fileURLToPath } from "url";
import { changePassword } from "./controller/changingPassword.js";
import { updateStatus } from "./controller/paymentController.js";

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
connectDB();

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  updateStatus
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));

app.use("/api/v1/onlineCustomer", onlineCustomerRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/printingUnit", printingUnitRouter);
app.use("/api/v1/tokenRouter", tokenRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/review", reviewRouter);
app.use("/api/refresh", refresh);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/change-password", changePasswordRoutes);
app.use("/api/v1/invoice", invoiceRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on PORT:${PORT}`);

  // Start ngrok only if in development (optional)
  /*
  if (process.env.NODE_ENV !== "production") {
    try {
      const listener = await ngrok.forward({
        addr: PORT,
        authtoken_from_env: true,
      });
      console.log(`Ngrok tunnel established at: ${listener.url()}`);
    } catch (err) {
      console.error("Failed to start ngrok:", err);
    }
  }
  */
});
export { app };

// ngrok http 3000 --domain=willingly-good-ostrich.ngrok-free.app
