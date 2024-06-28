import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

reviewSchema.index({ shop_id: 1, user_id: 1 }, { unique: true });

const reviewDataModel = mongoose.model('Review', reviewSchema);

export default reviewDataModel;
