import { Image } from "../models/image.models.js";
import cloudinary from "../config/cloudinary.js";
import fs from 'fs'


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
        publicId: result.public_id
        
    })

    // delete local file 
     fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Image uploaded successfully",
      details: newImage,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error"
    });
  }
};


export const getAllImages = async (req, res) => {
  try {
    const result = await Image.find()

    res.status(200).json({
      message: "all data fetched",
      results: result
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Data not fetched."
    })
  }
}


export const getOneImage = async(req, res) => {
  try {
    const {id} = req.params;
    const result = await Image.findById(id)

    if(!result){
      return res.status(404).json({
        message: "Image not Found"
      })
    }

    res.status(200).json({
      message: "Data Fetched success",
      result
    })

    
  } catch (error) {
     res.status(500).json({
      message: "Data not fetched",
    })
  }
}


export const deleteImage = async (req, res) => {
  try {
    const {id} = req.params
    const result = await Image.findById(id)


    if(!result){
      return res.status(404).json({
        message: "Image not found"
      });
    
    }
    
    await cloudinary.uploader.destroy(result.publicId)

    await Image.findByIdAndDelete(id)

     res.status(200).json({
      message: "Data deleted success",
      data: result
    })
    
  } catch (error) {
    console.log(error)
     res.status(500).json({
      message: "Deletion Error!"
    })
  }
}

