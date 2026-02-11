import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    triggerAt: {
        type: Date,
        required: true,
        index: true,
    },
}, {timestamps: true})

export const Alert = mongoose.model("Alert", alertSchema, "alerts")