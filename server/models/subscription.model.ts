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
            enum: ["daily", "weekly", "monthly", "yearly"],
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
                "Entertainment",
                "Productivity",
                "Education",
                "Cloud storage",
                "Health"
            ],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "expired", "cancelled"],
            default: "active",
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
