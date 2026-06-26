import express from "express"
import multer from "multer"
import { addProduct, listProduct, removeProducts } from "../controllers/productController.js"

const productRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) =>{
    return cb(null,`${Date.now()} ${file.originalname}`)



}
})

const upload = multer({storage:storage})

productRouter.post("/add", upload.single("image") ,addProduct)
productRouter.get("/list",listProduct)
productRouter.post("/remove",removeProducts)

export default productRouter


