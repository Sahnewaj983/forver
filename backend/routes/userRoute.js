import express from 'express';
import authUser from '../middleware/auth.js'
import { loginUser, registerUser, adminLogin, getCurrentUser, logoutUser , forgotPassword, resetPassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/admin',adminLogin);
userRouter.get("/me",authUser ,getCurrentUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;
