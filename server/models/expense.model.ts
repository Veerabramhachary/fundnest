import mongoose, { model, Schema } from "mongoose";

const expensesSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Housing",
                "Bills",
                "Utilities",
                "Transportation",
                "Food",
                "Ride",
                "Health",
                "Care",
                "Kids/Pets",
                "Shopping",
                "Education",
                "Family",
                "Miscellaneous"
            ],
        },
        note: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
);

export const Expenses = model("Expense", expensesSchema, "expenses");
