import http from "http";
import dotenv from "dotenv";
import app from "./app.ts";
import { connectionDB } from "./config/db.ts";

dotenv.config();

const startServer = async () => {
    await connectionDB();

    const server = http.createServer(app);

    server.listen(5000, () => {
        console.log("🚀 Server running on port 5000");
    });
};

startServer().catch((err) => {
    console.error("Server failed to start:", err);
});
