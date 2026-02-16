import type { Request, Response } from "express";

import { AppError } from "../lib/utils/AppError.ts";
import { Subscriptions } from "../models/subscription.model.ts";
import mongoose from "mongoose";

export const createSubscription = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { title, category, amount, frequency, autoRenew } = req.body;
    const startDate = req.body.startDate
        ? new Date(req.body.startDate)
        : new Date();
    //Compute expiry bases on frequency
    let expired: Date;
    const start = startDate;
    switch (frequency?.toLowerCase()) {
        case "daily":
            expired = new Date(start);
            expired.setDate(expired.getDate() + 1);
            break;
        case "weekly": 
            expired = new Date(start);
            expired.setDate(expired.getDate() + 7);
            break
        case "monthly":
            expired = new Date(start);
            expired.setMonth(expired.getMonth() + 1);
            break;
        case "yearly":
            expired = new Date(start);
            expired.setFullYear(expired.getFullYear() + 1);
            break;
        default:
            throw new AppError(400, "Invalid frequency");
    }
    const newSubscription = await Subscriptions.create({
        userId,
        name: title,
        category,
        amount,
        frequency,
        autoRenew,
        startDate: start,
        status: "active",
        expired
    });
    return res.status(200).json(newSubscription);
};

export const getSubscriptions = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const subscriptions = await Subscriptions.find({userId})
    if(!subscriptions || subscriptions.length === 0) {
        throw new AppError(409, "no subscriptions found")
    }
    return res.status(200).json(subscriptions);
};

interface ISubscription {
    title: string;
    amount: number;
    note: string;
}
type UpdatedSubscriptionDTO = Partial<Pick<ISubscription, "title" | "amount" | "note">>;
export const updateSubscription = async (
    req: Request<{ id: string }, {}, UpdatedSubscriptionDTO>,
    res: Response,
) => {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const updates = req.body;

    const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, v]) => v !== undefined),
    );
    // Update Expense
    const updatedSubscription = await Subscriptions.findByIdAndUpdate(
        {id: id, userId},
        { $set: filteredUpdates },
        { new: true, runValidators: true },
    );

    if (!updatedSubscription) {
        throw new AppError(404, "Subscription not found or not authorized");
    }

    return res.status(200).json(updatedSubscription);
};

export const deleteSubscription = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const deleted = await Subscriptions.findOneAndDelete({
        _id: id,
        userId: userId,
    });

    if (!deleted) {
        throw new AppError(404, "not found or not authorized");
    }
    return res.status(200).json({ message: "Deleted Successfully" });
};
