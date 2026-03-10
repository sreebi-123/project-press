import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnlineCustomer',
  },
  customerName: { type: String, required: true },
  comment: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  printingUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PrintingPressUnit',
  }
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);
