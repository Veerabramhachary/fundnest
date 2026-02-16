import type { Request, Response } from "express";
import { Expenses } from "../models/expense.model.ts";
import { AppError } from "../lib/utils/AppError.ts";

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}
export const createExpense = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const { title, category, amount, date, note } = req.body;
    const newExpense = await Expenses.create({
        userId: userId,
        name: title,
        category,
        amount,
        date,
        note,
    });
    return res.status(201).json(newExpense);
};

export const getExpenses = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if(!userId) {
        throw new AppError(401, "Unauthorized");
    }
    const expenses = await Expenses.find({ userId: userId });
    return res.status(200).json(expenses);
};

interface IExpense {
    name: string;
    amount: number;
    note: string;
}
type UpdatedExpenseDTO = Partial<Pick<IExpense, "name" | "amount" | "note">>;
export const updateExpense = async (
    req: AuthenticatedRequest & Request<{ id: string }, {}, UpdatedExpenseDTO>,
    res: Response,
) => {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        throw new AppError(401, "Unauthorized");
    }
    const updates = req.body;

    const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, v]) => v !== undefined),
    );
    // Update Expense
    const updatedExpense = await Expenses.findOneAndUpdate(
        { _id: id, userId: userId },
        { $set: filteredUpdates },
        { new: true, runValidators: true },
    );

    if (!updatedExpense) {
        throw new AppError(404, "Expense not found or not authorized");
    }

    return res.status(200).json(updatedExpense);
};

export const deleteExpense = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        throw new AppError(401, "No authentication user");
    }
    const deleted = await Expenses.findOneAndDelete({
        _id: id,
        userId: userId,
    });

    if (!deleted) {
        throw new AppError(404, "not found or not authorized");
    }
    return res.status(200).json({ message: "Deleted Successfully" });
};
