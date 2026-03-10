import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  currentToken: {
    type: Number,
    required: true,
    default: 1
  }
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
