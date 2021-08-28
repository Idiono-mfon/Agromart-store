import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Category", categorySchema);
