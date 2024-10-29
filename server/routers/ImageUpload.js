import express from "express";
const ImageRouter = express.Router();
import { upload } from "../middleware/multer.js";
import { uploadImage } from "../controllers/imageUpload.js";

ImageRouter.post("/image", upload.single("file"), uploadImage);

export default ImageRouter;
