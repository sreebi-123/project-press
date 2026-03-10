import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  razorpayPlanId: String,

  // Item fields
  item_name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  description: String,

  // Plan fields
  period: {
    type: String,
    enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
    required: true,
  },
  interval: { type: Number, required: true },

  // Notes
  notes_key_1: String,
  notes_key_2: String,

  // Visibility
  isVisible: { type: Boolean, default: false },
});

export const Plan = mongoose.model("Plan", planSchema);