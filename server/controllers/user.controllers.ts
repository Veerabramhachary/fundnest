import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { AppError } from "../lib/utils/AppError.ts";

export const me = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
        throw new AppError(404, "User not found");
    }
    res.status(200).json({ user: userData });
};

// typescript
interface IUser {
    name: string;
    salary: number;
}
type UpdatedUserDTO = Partial<Pick<IUser, "name" | "salary">>;
export const updateMe = async (
    req: Request<{},
    {},
    UpdatedUserDTO>,
    res: Response,
) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        throw new AppError(401, "No authentication user");
    }
    const updates = req.body;
    const allowedFields: (keyof UpdatedUserDTO)[]= ["name", "salary"];
    const filteredUpdates: Partial<UpdatedUserDTO> = {};
    for (const field of allowedFields) {
        if (updates[field] !== undefined){
            filteredUpdates[field] = updates[field];
        }
    }
    

    //Update user
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: filteredUpdates },
        { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
        throw new AppError(404, "User not found");
    }

    return res.status(200).json({user: updatedUser});
};
