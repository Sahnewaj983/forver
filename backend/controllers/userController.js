import userModel from "../models/userModel.js";
import {sendEmail} from "../utils/sendEmail.js"
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';



const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    if (user.googleAuth) {
      return res.json({
        success: false,
        message: "Please login with Google"
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id)
      res.json({ success: true, token })
    }
    else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//Route for register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exist or not
    const exists = await userModel.findOne({ email });

    if (exists && exists.googleAuth) {
      return res.json({
        success: false,
        message: "Account already created using Google. Please login with Google."
      });
    }

    if (exists) {
      return res.json({ success: false, message: "User already exist" })
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password" })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPaswword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPaswword
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error.message })
  }

}

export const logoutUser = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    //Create token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();
    //await user.save({ validateBeforeSave: false });

    const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: `<a href="${resetUrl}">Reset Password</a>`
    });

    res.json({
      success: true,
      message: "Password reset link send to email"
    })


  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Reset password fail"
    });
  }
}

export const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or token expired "
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Reset password fail"
    });
  }
}

//Route for admin login

const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      //const token = jwt.sign(email+password,process.env.JWT_SECRET)
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ success: true, token })
    }
    else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


export const getCurrentUser = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .select("-password");

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export { loginUser, registerUser, adminLogin }