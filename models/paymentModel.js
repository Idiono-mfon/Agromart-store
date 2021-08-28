import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paymentID: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },

  status: {
    type: Boolean,
    defualt: false,
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Payment", paymentSchema);
