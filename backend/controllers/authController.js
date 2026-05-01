import { OAuth2Client } from "google-auth-library";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req,res) => {
    try {
        
        const {googleToken} = req.body;

        if (!googleToken) {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }

        //Verify token with google
        const ticket = await googleClient.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        //Extract user info from token
        const payload = ticket.getPayload();
        const {email, name, picture} = payload;

        let user = await userModel.findOne({email});

        if(!user) {
            user = await userModel.create({
                name,
                email,
                avatar : picture,
                googleAuth: true,
            });
        }

        const authToken = jwt.sign(
            {userId : user._id}, //this line userId
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", authToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "none",
            maxAge: 7*24*60*60*1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login Success",
            user
        })

    } catch (error) {
        console.log("Goggle auth eroor", error)
        return res.status(400).json({
            success: false,
            message: "Google auth failed",
        });
    }
}

