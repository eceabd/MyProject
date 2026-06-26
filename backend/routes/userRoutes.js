import express from "express"
import { deleteUser, demoteToUser, getAllUsers, loginUser, makeAdmin, registerUser } from "../controllers/userController.js"
//هنا بنستورد مكتبة express لإنشاء راوتر جديد ونستورد الدوال التي تم إنشائها في ملف الكنترولر للتعامل مع طلبات المستخدمين
const userRouter =  express.Router()
userRouter.post("/login" , loginUser)
userRouter.post("/register" , registerUser)
userRouter.get("/list" , getAllUsers)
userRouter.delete("/delete/:id" ,deleteUser)
userRouter.put("/make-admin/:id" ,makeAdmin)
userRouter.put("/demote/:id" ,demoteToUser)


export default userRouter