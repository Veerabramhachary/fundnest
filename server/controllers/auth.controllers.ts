import { type Request, type Response } from "express";
import { User } from "../models/user.model.ts";
import { checkPassword, hashPassword } from "../lib/hash.ts";
import { createAccessToken, createRefreshToken } from "../lib/token.ts";
import jwt from "jsonwebtoken";
import otpGenerator from "../lib/otpGenerator.ts";
import { sendEmail } from "../lib/email.ts";

// register Handler which take data from client and create account into database
export const registerHandler = async (req: Request, res: Response) => {
    try {
        const { name, email, password, salary } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.json({
                message: "User Already exist, try with different Email",
            });
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

        // Email sending
        await sendEmail(
            newlyCreatedUser.email,
            "Verify your email",
            `<p>OTP CODE</p>
            <p style={{font-size: "30px" font-weight:"bold"}}>${otp}</p>`
        )

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
    } catch (error) {
        console.error("Register error:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", error });
    }
};

// which compare 4 digit code and update database
export const verifyEmailHandler = async (req: Request, res: Response) => {
    const { otpInput } = req.body;
    if (!otpInput || typeof otpInput !== "string") {
        return res.status(400).json({ message: "OTP required" });
    }
    // console.log("Received OTP:", JSON.stringify(otpInput));
    const userId = (req as any).user?.id;

    // console.log("Verify OTP - userId:", userId, "otpInput:", otpInput);

    try {
        if (!userId) {
            return res.status(401).json({ message: "No authenticated user" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // console.log("User OTP in DB:", user.otp, "Input:", otpInput); // DEBUG
        // console.log("Raw types:", typeof user.otp, typeof otpInput);
        // console.log("Raw values:", user.otp, otpInput);
        // const parsed = parseInt(otpInput);
        // console.log(
        //     "Parsed:",
        //     parsed,
        //     "NaN?",
        //     isNaN(parsed),
        //     "Match?",
        //     user.otp === parsed,
        // );
        if (user.otp !== Number(otpInput)) {
            // ✅ Convert string to number
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpiry && user.otpExpiry.getTime() < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        user.isVerified = true;
        user.otp = 0;
        user.otpExpiry = undefined; // ✅ Better than null
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Verify email error:", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

// Generate new otp

export const resendEmailHandler = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    try {
        if(!userId) { 
            return res.status(401).json({ message: "No authentication user"});
        }
        const user = await User.findById(userId);

        // check if user exists
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // 2. Check if already verified (prevents spamming/logical errors)
        if (user.isVerified) {
            return res.status(400).json({ message: "Account is already verified" });
        }
        //Generate New OTP and Expiry (e.g., 10 minutes from now)
        const newOtp = await otpGenerator();
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Update Database
        user.otp= Number(newOtp);
        user.otpExpiry = expiryDate;

        await user.save();
        // resend email
        await sendEmail(
            user.email,
            "Verify your email",
            `<p>NEW OTP CODE</p>
            <p style={{font-size: "30px" font-weight:"bold"}}>${newOtp}</p>`
        )
        // Success response

        return res.status(200).json({
            message: "A new OTP has been generated and updated in the system."
        })
    } catch (error) {
        console.error("Resend OTP ERROR: ", error);
        return  res.status(500).json({ message: "Internal Server error" });
    }
};
// login handler which takes data from client and compare with database data and send token to client which cookie
export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid Email or password!" });
        }
        const check = await checkPassword(password, user?.passwordHash);
        if (!check) {
            return res.status(400).json({ message: "invalid password!" });
        }

        if (!user.isVerified) {
            return res.status(409).json({
                message: "Email verification not completed",
            });
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
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordHash = await hashPassword(password);
        user.passwordHash = passwordHash;
        user.save();
        return res
            .status(200)
            .json({ message: "Password updated successfully" });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logoutHandler = async (req: Request, res: Response) => {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
    });
};
