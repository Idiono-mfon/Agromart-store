import User from "../models/userModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    if (user.role === 0)
      return res.status(400).json({ msg: "Admin resources access denied" });
    return next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
