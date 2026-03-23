import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: {type: String, required: function () {
        return !this.googleAuth;
    }},
    resetPasswordToken : String,
    resetPasswordExpire : Date,
    avatar: {type: String},
    googleAuth: { type: Boolean, default: false },
    cartData: {type: Object, default : {}},
},{minimize: false})

const userModel = mongoose.models.user || mongoose .model('user', userSchema)

export default userModel

