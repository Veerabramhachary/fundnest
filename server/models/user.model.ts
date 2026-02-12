import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
        default: 0,
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    tokenVersion : {
        type: Number,
        default: 0,
    },
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordTokenExpiry: {
        type: Date,
        default: undefined
    }
}, {
    timestamps: true,
})

export const User = mongoose.model("User", UserSchema);
