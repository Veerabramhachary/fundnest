import { type Request, type Response } from "express";
import { User } from "../models/user.model.ts";
import { checkPassword, hashPassword } from "../lib/security/hash.ts";
import {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
} from "../lib/security/token.ts";
import jwt from "jsonwebtoken";
import otpGenerator from "../lib/security/otpGenerator.ts";
import { sendEmail } from "../lib/email.ts";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../lib/utils/AppError.ts";


const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

// register Handler which take data from client and create account into database
export const registerHandler = async (req: Request, res: Response) => {
    const { name, email, password, salary } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        throw new AppError(400, "Email already exists")
    }

    const passwordHash = await hashPassword(password);
    const newlyCreatedUser = await User.create({
        name,
        email: normalizedEmail,
        passwordHash,
        salary,
        isVerified: false,
    });

    const otp = await otpGenerator();
    console.log("generated otp: ", otp);

    const accessToken = jwt.sign(
        {
            sub: newlyCreatedUser._id.toString(),
            tokenVersion: newlyCreatedUser.tokenVersion,
        },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "1d" },
    );
    const template = await fs.readFile(
        path.join(__dirname, "../lib/Templates/otp-template.html"),
        "utf-8",
    );
    const html = template.replace("{{OTP_CODE}}", String(otp));

    // Email sending
    await sendEmail(newlyCreatedUser.email, "Verify your email", html);

    await User.updateOne(
        { _id: newlyCreatedUser._id },
        {
            otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
        },
    );
    console.log("User OTP updated:", newlyCreatedUser._id, otp);

    res.status(200).json({
        message: "Account successfully created",
        accessToken,
    });
};

// which compare 4 digit code and update database
export const verifyEmailHandler = async (req: Request, res: Response) => {
    const { otpInput } = req.body;
    if (!otpInput || typeof otpInput !== "string") {
        throw new AppError(400, "Invalid OTP")
    }
    const userId = (req as any).user?.id;

        if (!userId) {
            throw new AppError(401, "No authentication user")
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found")
        }

        if (user.otp !== Number(otpInput)) {
            // ✅ Convert string to number
            throw new AppError(400, "Invalid OTP")
        }

        if (user.otpExpiry && user.otpExpiry.getTime() < Date.now()) {
            throw new AppError(400, "OTP expired")
        }

        user.isVerified = true;
        user.otp = 0;
        user.otpExpiry = undefined; // ✅ Better than null
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });
};

// Generate new otp

export const resendEmailHandler = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    
        if (!userId) {
            throw new AppError(401, "No authentication user")
        }
        const user = await User.findById(userId);

        // check if user exists
        if (!user) {
            throw new AppError(404, "User not found")
        }
        // 2. Check if already verified (prevents spamming/logical errors)
        if (user.isVerified) {
            throw new AppError(400, "Email already verified")
        }
        //Generate New OTP and Expiry (e.g., 10 minutes from now)
        const newOtp = await otpGenerator();
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Update Database
        user.otp = Number(newOtp);
        user.otpExpiry = expiryDate;

        await user.save();

        const template = await fs.readFile(
            path.join(__dirname, "../lib/Templates/otp-template.html"),
            "utf-8",
        );
        const html = template.replace("{{OTP_CODE}}", String(newOtp));
        // resend email
        await sendEmail(user.email, "Verify your email", html);
        // Success response

        return res.status(200).json({
            message: "A new OTP has been generated and updated in the system.",
        });
};
// login handler which takes data from client and compare with database data and send token to client which cookie
export const loginHandler = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            throw new AppError(409, "User not found")
        }
        const check = await checkPassword(password, user?.passwordHash);
        if (!check) {
            throw new AppError(409, "invalid password")
        }

        if (!user.isVerified) {
            throw new AppError(309, "Email not verified")
        }

        const accessToken = createAccessToken(user.id, user.tokenVersion);

        const refreshToken = createRefreshToken(user.id, user.tokenVersion);
        const isProd = process.env.NODE_ENV === "production";

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.status(200).json({
            message: "Login successfully done",
            accessToken,
        });
};

// Refresh Token reset
export const refreshTokenHandler = async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken as string | undefined;
        if (!refreshToken) {
            throw new AppError(401, "No refresh token")
        }
        const payload = verifyAccessToken(refreshToken);
        const user = await User.findById(payload.sub);

        if (!user) {
            throw new AppError(401, "user not found")
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            throw new AppError(401, "Refresh token is invalidated")
        }

        const newAccessToken = createAccessToken(user.id, user.tokenVersion);
        const newRefreshToken = createRefreshToken(user.id, user.tokenVersion);
        const isProd = process.env.NODE_ENV === "production";

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.status(200).json({
            message: "Login successfully done",
            accessToken: newAccessToken,
        });
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
    const { email } = req.body as { email?: string };
    if (!email) {
        throw new AppError(400, "Email required");
    }
    const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            throw new AppError(404,"User not found" );
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const token = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.resetPasswordToken = token;
        user.resetPasswordTokenExpiry = expiryDate;
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

        const template = await fs.readFile(
            path.join(
                __dirname,
                "../lib/Templates/reset-password-template.html",
            ),
            "utf-8",
        );
        const html = template.replace("{{resetUrl}}", resetUrl);
        await sendEmail(user.email, "Reset your password", html);
        return res.status(201).json({
            message: "IF this email were exist, we send link to mail id",
        });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { token, password } = req.body as {
        token?: string;
        password?: string;
    };

    if (!token) {
        throw new AppError(400, "Token required" );
    }
    if (!password || password.length < 6) {
        throw new AppError(400,"Password must be at least 6 characters long" );
    }

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: tokenHash,
            resetPasswordTokenExpiry: { $gt: new Date(Date.now()) },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await hashPassword(password);
        user.passwordHash = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;
        user.tokenVersion += 1;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
};

export const logoutHandler = async (req: Request, res: Response) => {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
};
