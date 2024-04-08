import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;