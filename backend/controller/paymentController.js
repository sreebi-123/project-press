// import Razorpay from 'razorpay';
// import dotenv from 'dotenv';
// import Payment from '../model/paymentSchema.js';

// dotenv.config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET
// });

// export const createRazorpayOrder = async (req, res) => {
//   const { amount, orderId, userId } = req.body;

//   const options = {
//     amount: amount * 100, // in paise
//     currency: 'INR',
//     receipt: `receipt_${orderId}`,
//     payment_capture: 1
//   };

//   try {
//     const razorpayOrder = await razorpay.orders.create(options);

//     const payment = new Payment({
//       orderId,
//       userId,
//       amount,
//       currency: 'INR',
//       status: 'pending',
//       transactionId: razorpayOrder.id
//     });

//     await payment.save();

//     res.status(200).json({
//       success: true,
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import asyncHandler from "express-async-handler";
// import { printingPressunit } from "../model/printingPressunit.js";
// import { Order } from "../model/OrderSchema.js";
// import { createOrder } from "../utils/razorpay.js";
// import Payment from "../model/paymentSchema.js";

// export const createShopRazorpayOrder = asyncHandler(async (req, res) => {
//   const { shopId, amount } = req.body;
//   const order = await createOrder({
//     amount,
//     receipt: `shop_${shopId}_${Date.now()}`,
//   });
//   res.json(order);
// });

// export const verifyShopPayment = asyncHandler(async (req, res) => {
//   const {
//     ShopId,
//     amount,
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//   } = req.body;
//   const data = {
//     paymentId: razorpay_payment_id,
//     orderId: razorpay_order_id,
//     signature: razorpay_signature,
//     amount,
//     type: "shop",
//     refId: ShopId,
//     status: "paid",
//   };
//   const customerResult = await Payment.create(data);
//   const shopResult = await printingPressunit.findByIdAndUpdate(
//     ShopId,
//     {
//       isActive: true,
//       subscription: {
//         isPaid: true,
//         startDate: new Date(),
//         nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
//         lastPaymentDate: new Date(),
//         amount: amount, // comes from Razorpay order
//       },
//     },
//     { new: true }
//   );
//   console.log("Shop Schema creation creation:", shopResult);

//   if (!shopResult || !customerResult) {
//     return res.status(404).json({ message: "Data not found" });
//   }
//   res.status(200).json({shopResult});
// });

// export const createCustomerRazorpayOrder = asyncHandler(async (req, res) => {
//   const { orderId, amount } = req.body;
//   const order = await createOrder({
//     amount: amount * 100,
//     receipt: `order_${orderId}_${Date.now()}`,
//   });
//   res.json(order);
// });

// export const verifyCustomerPayment = asyncHandler(async (req, res) => {
//   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//     req.body;
//   const { orderId } = req.params; // Your Order _id

//   const paymentRecord = await Payment.findOneAndUpdate(
//     { orderId: razorpay_order_id },
//     {
//       paymentId: razorpay_payment_id,
//       signature: razorpay_signature,
//       status: "paid",
//     },
//     { new: true }
//   );
//   const orderRecord = await Order.findByIdAndUpdate(orderId, {
//     paymentStatus: "payment_received",
//     billingDetails: {
//       isPaid: true,
//       paidAt: new Date(),
//       paymentMethod: "razorpay",
//     },
//   });

//   if (!orderRecord || !paymentRecord) {
//     return res.status(404).json({ message: "Data not found" });
//   }
//   res.status(200).json({ order: orderRecord, payment: paymentRecord });
// });


import asyncHandler from "express-async-handler";
import { printingPressunit } from "../model/printingPressunit.js";
import { Order } from "../model/OrderSchema.js";
import { createOrder, razor } from "../utils/razorpay.js";
import Payment from "../model/paymentSchema.js";
import { Plan } from "../model/planSchema.js";
import crypto from "crypto";

export const createShopRazorpayOrder = asyncHandler(async (req, res) => {
  const { shopId, amount } = req.body;
  const order = await createOrder({
    amount,
    receipt: `shop_${shopId}_${Date.now()}`,
  });
  res.json(order);
});

export const verifyShopPayment = asyncHandler(async (req, res) => {
  const {
    ShopId,
    amount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;
  const data = {
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    signature: razorpay_signature,
    amount,
    type: "shop",
    refId: ShopId,
    status: "paid",
  };
  const customerResult = await Payment.create(data);
  const shopResult = await printingPressunit.findByIdAndUpdate(
    ShopId,
    {
      isActive: true,
      subscription: {
        isPaid: true,
        startDate: new Date(),
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
        lastPaymentDate: new Date(),
        amount: amount, // comes from Razorpay order
      },
    },
    { new: true }
  );
  console.log("Shop Schema creation creation:", shopResult);

  if (!shopResult || !customerResult) {
    return res.status(404).json({ message: "Data not found" });
  }
  res.status(200).json({ shopResult });
});

export const createCustomerRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId, amount } = req.body;
  const order = await createOrder({
    amount: amount * 100,
    receipt: `order_${orderId}_${Date.now()}`,
  });
  res.json(order);
});

export const verifyCustomerPayment = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const { orderId } = req.params; // Your Order _id

  const paymentRecord = await Payment.findOneAndUpdate(
    { orderId: razorpay_order_id },
    {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: "paid",
    },
    { new: true }
  );
  const orderRecord = await Order.findByIdAndUpdate(orderId, {
    paymentStatus: "payment_received",
    billingDetails: {
      isPaid: true,
      paidAt: new Date(),
      paymentMethod: "razorpay",
    },
  });

  if (!orderRecord || !paymentRecord) {
    return res.status(404).json({ message: "Data not found" });
  }
  res.status(200).json({ order: orderRecord, payment: paymentRecord });
});

// Create plan
export const createPlan = asyncHandler(async (req, res) => {
  const { period, interval, item, notes } = req.body;

  const plan = await razor.plans.create({
    period,
    interval,
    item: {
      name: item.name,
      amount: item.amount * 100, // Razorpay expects paise
      currency: item.currency || "INR",
      description: item.description || "",
    },
    notes,
  });

  // Save plan in DB

  const savedPlan = await Plan.create({
    razorpayPlanId: plan.id,
    item_name: item.name,
    amount: item.amount,
    currency: item.currency || "INR",
    description: item.description || "",
    period,
    interval,
    notes_key_1: notes?.notes_key_1 || "",
    notes_key_2: notes?.notes_key_2 || "",
    isVisible: false,
  });

  res.status(201).json({ success: true, plan: savedPlan });
});

export const allPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

export const setVisiblePlan = asyncHandler(async (req, res) => {
  const { planId } = req.body;

  await Plan.updateMany({}, { isVisible: false });
  const plan = await Plan.findByIdAndUpdate(planId, { isVisible: true });

  res.status(201).json({ success: true, plan: plan });
});

export const visiblePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findOne({ isVisible: true });
  res.json(plan);
});

export const createSubscription = asyncHandler(async (req, res) => {
  const { planId, name, email, phone } = req.body;
  const userId = req.user.shopId;
  console.log("credentials", name, email, phone);

  const customer = await razor.customers.create({
    name,
    email,
    contact: phone,
  });
  console.log("customer", customer);

  const subscription = await razor.subscriptions.create({
    plan_id: planId,
    customer_notify: true,
    total_count: 12,
    customer_id: customer.id,
  });

  // Save subscription details to user schema
  const updatedUser = await printingPressunit.findByIdAndUpdate(
    userId,
    {
      razorpay_subscription_id: subscription.id,
      razorpay_plan_id: subscription.plan_id,
      subscription_status: subscription.status,
      subscription_start_at: subscription.start_at,
      subscription_end_at: subscription.end_at,
      total_count: subscription.total_count,
      paid_count: subscription.paid_count,
      remaining_count: subscription.remaining_count,
      // short_url: subscription.short_url,
    },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }
  console.log(updatedUser.razorpay_subscription_id);
  res.json({ subscriptionId: updatedUser.razorpay_subscription_id });
});

export const updateStatus = asyncHandler(async (req, res) => {
  // console.log("header", req);
  // console.log(req.body);
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  console.log("secret", secret);
  const rawBody = req.body;
  console.log("rawBody", rawBody);

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(rawBody);
  const digest = shasum.digest("hex");
  console.log("digest", digest);

  const razorpaySignature = req.headers["x-razorpay-signature"];
  console.log("razorpaySignature", razorpaySignature);

  if (digest === razorpaySignature) {
    const data = JSON.parse(rawBody.toString("utf8"));
    console.log("Webhook verified data:", data);

    const subscription = data.payload.subscription.entity;
    console.log("Webhook verified", subscription);

    const subscriptionId = subscription.id;
    const status = subscription.status;

    // Update user
    const result = await printingPressunit.findOneAndUpdate(
      { razorpay_subscription_id: subscriptionId },
      {
        subscription_status: status,
        subscription_start_at: subscription.start_at,
        subscription_end_at: subscription.end_at,
        paid_count: subscription.paid_count,
        remaining_count: subscription.remaining_count,
      }
    );
    console.log("result", result);

    console.log("User subscription updated successfully");
  } else {
    console.log("Invalid webhook signature");
  }

  res.status(200).json({ status: "ok" });
});