import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  try {
    // const token = req.header("Authorization");
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    if (token && isCustomToken) {
      // Custom Token Generated
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });
        req.user = user;
        return next();
      });
    } else {
      // Google login token
      // Work on this latter
    }
    //const isCustomToken = token.length < 500;
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
