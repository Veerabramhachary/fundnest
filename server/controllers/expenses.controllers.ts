import type { Request, Response } from "express";
import { Expenses } from "../models/expense.model.ts";
import { AppError } from "../lib/utils/AppError.ts";

export const createExpense = async ( req: Request, res: Response ) => {
    const userId = (req as any).user?.id;
    const {title, category, amount, date, note} = req.body;
    const newExpense = await Expenses.create({
        userId: userId,
        name: title, 
        category,
        amount,
        date,
        note
    });
    return res.status(200).json(newExpense)
};

export const getExpenses = async ( req: Request, res: Response ) => {
    const userId = (req as any).user?.id;
    const expenses = await Expenses.find({userId: userId});
    return res.status(200).json(expenses)
}
interface IExpense {
    name: string;
    amount: number;
    note: string;
}
type UpdatedExpenseDTO = Partial<Pick<IExpense, "name" | "amount" | "note">>;
export const updateExpense = async ( req: Request<{id: string},{},UpdatedExpenseDTO>, res: Response ) => {
    const {id} = req.params;
    const updates = req.body;

    const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_,v])=> v !== undefined)
    );
    // Update Expense
    const updatedExpense = await Expenses.findByIdAndUpdate(
        id,
        { $set: filteredUpdates},
        {new: true, runValidators: true },
    ).select("-password")

    if(!updatedExpense) {
        throw new AppError(404, "Expense not found")
    }

    return res.status(200).json(updatedExpense)
}

export const deleteExpense = async ( req: Request, res: Response ) => {
    const {id} = req.params;
    const userId = (req as any).user?.id;

    const deleted = await Expenses.findOneAndDelete({
        _id: id,
        userId: userId,
    });

    if(!deleted) {
        throw new AppError(404, "not found or not authorized");
    }
    return res.status(200).json({message: "Deleted Successfully"})
}