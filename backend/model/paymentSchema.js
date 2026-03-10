// import mongoose from 'mongoose';

// const paymentSchema = new mongoose.Schema({
//   orderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order',
//     required: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   amount: { type: Number, required: true },
//   currency: { type: String, default: 'INR' },
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'cash', 'upi', 'wallet', 'netbanking'],
//     default: 'cash'
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'successful', 'failed', 'refunded'],
//     default: 'pending'
//   },
//   transactionId: { type: String }, // Razorpay Order ID
//   gatewayResponse: { type: Object },
//   createdAt: { type: Date, default: Date.now },
//   paidAt: { type: Date }
// });

// export default mongoose.model('Payment', paymentSchema);



import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentId: String, // Razorpay payment_id
  orderId: String, // Razorpay order_id
  signature: String,
  amount: Number,
  currency: { type: String, default: "INR" },

  type: { type: String, enum: ["shop", "customer"], required: true }, // payment context
  refId: { type: mongoose.Schema.Types.ObjectId, required: true }, // shopId or orderId

  status: {
    type: String,
    enum: ["created", "pending", "paid", "failed"],
    default: "created",
  },

  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Payment", paymentSchema);