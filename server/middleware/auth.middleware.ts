import { type NextFunction, type Request, type Response } from "express";
import { User } from "../models/user.model.ts";
import { verifyAccessToken } from "../lib/security/token.ts";
import { AppError } from "../lib/utils/AppError.ts";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = await verifyAccessToken(token);

        const user = await User.findById(payload.sub);

        if (!user) {
            throw new AppError(404, "User not found");
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            throw new AppError(403, "Invalid token");
        }

        (req as any).user = {
            id: user._id, // ✅ Use 'id' here (matches your controller)
            _id: user._id,
            email: user.email,
            name: user.name,
            salary: user.salary,
            isVerified: user.isVerified,
            tokenVersion: user.tokenVersion,
        };

        return next();
    } catch (err: any) {
        console.error("Auth middleware error:", err.message);
        next(err);
    }
};

export default auth;
