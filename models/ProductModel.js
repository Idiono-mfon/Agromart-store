import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  images: {
    type: Object,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Product", productSchema);
