import crypto from "crypto";

export const verifyPayment = (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const hmac = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hmac === razorpay_signature) {
    console.log("done");
    return next(); // Verified
  } else {
    return res.status(400).json({ message: "Invalid signature" });
  }
};