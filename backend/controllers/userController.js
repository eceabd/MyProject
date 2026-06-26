import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "كلمة المرور غير صحيحة" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "خطأ" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "المستخدم موجود بالفعل" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "أدخل بريد إلكتروني صحيح" });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "user deleted successfuly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const UpdatedUser = await userModel.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true },
    );

    if (!UpdatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "تم ترقية المستخدم إلى أدمن",
        data: UpdatedUser,
      });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export const demoteToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "user Is not an Admin" });
    }
    user.role = "user";
    await user.save();
    res.json({ success: true, message: "demote to user successfuly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
