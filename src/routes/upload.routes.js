import express from "express"
import upload from "../middleware/upload.middleware.js"
import { uploadImage} from "../controllers/image.controller.js"

const router = express.Router()

router.post("/uploads", upload.single("image"), uploadImage)


export default router

