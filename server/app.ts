import express from 'express';
import cors from 'cors';
import taskRouter from './routes/task.routes.ts';
import authRouter from './routes/auth.routes.ts';
import cookieParser from 'cookie-parser'
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET || "your_secret_key"))
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cors())

app.use("/use", (req, res) => {
    res.send("use one time token or id")
})

app.use("/api/task", taskRouter)
app.use("/api/auth", authRouter)

export default app;