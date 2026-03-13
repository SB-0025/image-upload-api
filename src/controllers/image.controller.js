import { Image } from "../models/image.models.js";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file Uploaded",
      });
    }

    // upload img to clodinary
    const result = await cloudinary.uploader.upload(req.file.path)


    // save metadata to db
    const newImage = await Image.create({
        filename: req.file.filename,
        imageUrl: result.secure_url,
        path: req.file.path,
        size: req.file.size
    })

    res.status(200).json({
      message: "Image uploaded successfully",
      details: newImage,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

