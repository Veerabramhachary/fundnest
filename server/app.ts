import express from "express";
import cors from "cors";
import taskRouter from "./routes/task.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import userRouter from "./routes/user.routes.ts";
import expensesRouter from "./routes/expenses.routes.ts";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalError.middleware.ts";
import subscriptionsRouter from './routes/subscriptions.routes.ts'
const cookieSecret = process.env.COOKIE_SECRET
if (!cookieSecret && process.env.NODE_ENV === "production"){
    throw new Error("COOKIE_SECRET must be set in production")
}
const app = express();
app.use(cookieParser(cookieSecret || "dev_secret_replace_in_prod"));
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());

app.use("/use", (req, res) => {
    res.send("use one time token or id");
});

app.use("/api/task", taskRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/subscriptions", subscriptionsRouter)

app.use(globalErrorHandler);
export default app;
