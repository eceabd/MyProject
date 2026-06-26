import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"

const app = express()
app.use(express.json())
const PORT = 7777;
app.use(cors()) 

app.use((req,res,next) => {
    console.log(`new request : ${req.method} on route: ${req.originalUrl}`)
    next()
})


// Routes
app.use("/image", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

app.get("/" , (req,res)=>{
    res.send("API Working!!")
})

const startServer = async ()=> {
      await connectDB();
    app.listen(PORT, ()=>{
        console.log(`server is running ${PORT}.......`)
    })
}
startServer()