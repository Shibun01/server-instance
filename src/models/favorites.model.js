import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true }
});

const favoriteDataModel = mongoose.model('Favorite', favoriteSchema);

export default favoriteDataModel;
