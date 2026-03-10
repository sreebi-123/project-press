import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const printingUnitSchema = new mongoose.Schema(
  {
    // Basic info
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    whatsapp: { type: String, require: true },
    address: { type: String, require: true },
    description: { type: String, default: "" },
    services: {
      type: [String],
      default: [],
    },
    role: { type: String, default: "admin" },

    // App status (can be disabled by superadmin if payment is pending)
    isActive: { type: Boolean, default: true },

    // Billing/subscription info
    subscription: {
      isPaid: { type: Boolean, default: false },
      startDate: { type: Date },
      nextDueDate: { type: Date },
      lastPaymentDate: { type: Date },
      amount: { type: Number },
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

    // Subscription fields

    razorpay_subscription_id: String,
    razorpay_plan_id: String,
    subscription_status: String,
    subscription_start_at: Number,
    subscription_end_at: Number,
    total_count: Number,
    paid_count: Number,
    remaining_count: Number,
    short_url: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

    // Optional: settings for future integrations
    settings: {
      tokenPrefix: { type: String, default: "TKN" },
      notifyViaWhatsApp: { type: Boolean, default: false },
    },

    // verification by superadmin
    verified: {
      type: Boolean,
      default: false,
    },
    // verification by superadmin (approval to login)
    approval: { type: Boolean, default: false },
    rejected: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
    uploads: {
      type: [String],
      default: [],
    },
    logo: { type: String, default: "" },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
printingUnitSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare entered password
printingUnitSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const printingPressunit = mongoose.model(
  "PrintingPressunit",
  printingUnitSchema
);
