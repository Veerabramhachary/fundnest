import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        frequency: {
            type: String,
            enum: ["daily", "Weekly", "monthly", "yearly"],
            required: true,
        },
        autoRenew: {
            type: Boolean,
            default: false,
        },
        category: {
            type: String,
            enum: [
                "Gym",
                "Shopping",
                "entertainment",
                "productivity",
                "shopping",
                "eduction",
                "cloud storage",
            ],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
        },
        expired: {
            type: Date,
        },
    },
    { timestamps: true },
);

export const Subscriptions = mongoose.model(
    "Subscriptions",
    subscriptionSchema,
    "subscriptions",
);
