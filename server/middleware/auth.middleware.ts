import { type NextFunction, type Request, type Response } from "express";
import { User } from "../models/user.model.ts";
import { verifyAccessToken } from "../lib/token.ts";

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
            return res.status(404).json({ message: "User not found" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.status(401).json({ message: "Token version mismatch" });
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
    } catch (err: any) {
        console.error("Auth middleware error:", err.message);
        return res
            .status(403)
            .json({ message: "Invalid token", error: err.message });
    }

    next();
};

export default auth;
