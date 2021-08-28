import Mongoose from "mongoose";
const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  isFarmer: {
    type: Boolean,
    default: false,
  },
  farmName: {
    type: String,
    default: "",
  },
  farmAddress: {
    type: String,
    default: "",
  },
  cart: {
    type: Array,
    default: [],
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

export default Mongoose.model("User", userSchema);
