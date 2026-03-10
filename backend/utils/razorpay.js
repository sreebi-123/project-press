import Razorpay from "razorpay";

export const razor = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

export const createOrder = async ({ amount, currency = "INR", receipt }) => {
  const options = { amount, currency, receipt };
  return await razor.orders.create(options);
};
