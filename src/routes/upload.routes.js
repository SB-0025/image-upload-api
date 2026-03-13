import express from "express"
import upload from "../middleware/upload.middleware.js"
import { uploadImage, getAllImages, getOneImage, deleteImage} from "../controllers/image.controller.js"


const router = express.Router()

router.post("/upload", upload.single("image"), uploadImage)
router.get("/images", getAllImages)
router.get("/image/:id", getOneImage)
router.delete("/image/:id", deleteImage)



export default router

