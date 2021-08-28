import fs from "fs";
import express from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js";
dotenv.config({ path: "./.env" });

const router = express.Router();

// Uploading Image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// Uploading of image is limited to admin alone (Change this latter)
//auth, adminAuth,
router.post("/upload", auth, adminAuth, (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded" });
    // 1024 * 1024 == 1mb
    const file = req.files.file;
    // Check file size
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.json({ msg: "file size is too large" });
    }
    // Check file size
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.json({ msg: "Incorrect file type" });
    }
    // Upload to cloudinary
    cloudinary.v2.uploader.upload(
      // Note other paramters can be added here to
      file.tempFilePath,
      { folder: "test", overwrite: true },
      async (err, result) => {
        if (err) throw err;
        return res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Delete Image
router.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      return res.json({ msg: "Image deleted" });
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  // Delete the temporary directory
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default router;
