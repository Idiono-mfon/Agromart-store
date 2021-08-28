import Payment from "../models/paymentModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/userModel.js";

export const getPayments = async (req, res) => {
  try {
    const payment = await Payment.find().sort({
      timestamps: -1,
    });
    return res.json(payment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) return res.status(400).json({ msg: "User does not exists." });
    const { cart, paymentID, address } = req.body;
    const { _id, name, email } = user;
    const newPayment = new Payment({
      user_id: _id,
      name,
      email,
      cart,
      paymentID,
      address,
    });
    await newPayment.save();

    // Update the number of items sold
    cart.filter((item) => {
      return sold(item._id, item.quantity, item.sold);
    });
    // console.log(newPayment);
    //return res.json({ msg: "Payment success" });
    return res.status(200).json(newPayment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getFarmerPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ "cart.owner._id": req.user.id }).sort(
      {
        timestamps: -1,
      }
    );
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
const sold = async (id, quantity, soldVal) => {
  try {
    await Product.findOneAndUpdate(
      { _id: id },
      {
        sold: quantity + soldVal,
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
