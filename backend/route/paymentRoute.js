// import express from 'express';
// import { createRazorpayOrder } from '../controller/paymentController.js';


// const router = express.Router();

// router.post('/create-order', createRazorpayOrder);


// export default router;

// import express from "express";
// import {
//   createCustomerRazorpayOrder,
//   createShopRazorpayOrder,
//   verifyCustomerPayment,
//   verifyShopPayment,
// } from "../controller/paymentController.js";
// import { verifyPayment } from "../middleware/verifyPayment.js";

// const router = express.Router();

// router.post("/create-shop-order", createShopRazorpayOrder);
// router.post("/create-customer-order", createCustomerRazorpayOrder);
// router.post("/verify-shop-payment", verifyPayment, verifyShopPayment);
// router.post("/verify-customer-payment", verifyPayment, verifyCustomerPayment);

// export default router;


// import express from 'express';
// import { createRazorpayOrder } from '../controller/paymentController.js';

// const router = express.Router();

// router.post('/create-order', createRazorpayOrder);

// export default router;

import express from "express";
import {
  allPlans,
  createCustomerRazorpayOrder,
  createPlan,
  createShopRazorpayOrder,
  createSubscription,
  setVisiblePlan,
  updateStatus,
  verifyCustomerPayment,
  verifyShopPayment,
  visiblePlan,
} from "../controller/paymentController.js";
import { verifyPayment } from "../middleware/verifyPayment.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/create-shop-order", createShopRazorpayOrder);
router.post("/create-customer-order", createCustomerRazorpayOrder);
router.post("/verify-shop-payment", verifyPayment, verifyShopPayment);
router.post("/verify-customer-payment", verifyPayment, verifyCustomerPayment);
router.post("/create-plan", createPlan);
router.get("/all-plans", allPlans);
router.post("/set-visible-plan", setVisiblePlan);
router.get("/visible-plan", visiblePlan);
router.post("/create-subscription", authenticateToken, createSubscription);
/*
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  updateStatus
);
*/
export default router;