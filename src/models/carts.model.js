import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true},
        category: {type: String},
        image_url: {type: String},
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

const cartDataModel = mongoose.model('Cart', cartSchema);

export default cartDataModel;