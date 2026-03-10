// ✅ route/invoiceRoutes.js
import express from "express";
import { generateInvoicePDF } from "../controller/invoiceController.js";

const router = express.Router();
router.get("/pdf/:id", generateInvoicePDF);

export default router;
