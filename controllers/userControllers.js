import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Payment from "../models/paymentModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPass,
    isFarmer,
    farmName,
    farmAddress,
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "The email already exists" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password is atleast 6 characters long" });
    if (password !== confirmPass)
      return res.status(400).json({ msg: "The password doesn't match" });
    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = isFarmer
      ? new User({
          name,
          email,
          password: passwordHash,
          isFarmer,
          farmName,
          farmAddress,
          role: 2,
        })
      : new User({
          name,
          email,
          password: passwordHash,
          isFarmer,
          farmName: "",
          farmAddress: "",
        });
    // Save the user
    await newUser.save();
    // Then create a jsonwebtoken to authenticate user
    const accessToken = createAccessToken({ id: newUser._id });
    return res.json({ accessToken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const refreshToken = async (req, res) => {
  const rf_token = req.cookies.refreshToken;
  try {
    console.log(rf_token);
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });
      const accessToken = createAccessToken({ id: user.id });
      return res.json({ accessToken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  // res.json({ rf_token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "incorrect login credentials" });
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "incorrect login credentials" });
    // if login is succesful, create access token and refresh token
    const accessToken = createAccessToken({ id: user._id });
    return res.json({ accessToken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged Out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: err.message });
    return res.json(user);
    // return res.json(req.user);
  } catch (error) {}
};

export const addCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    await User.findOneAndUpdate({ _id: req.user.id }, { cart: req.body.cart });
    return res.json({ msg: "Added to cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const history = async (req, res) => {
  try {
    const orderHistory = await Payment.find({ user_id: req.user.id }).sort({
      timestamps: -1,
    });
    return res.json(orderHistory);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1day" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1day",
  });
};
