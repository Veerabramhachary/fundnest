import http from "http";
import dotenv from "dotenv";
import app from "./app.ts";
import { connectionDB } from "./config/db.ts";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectionDB();

    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`🚀 Server running on port ${port}` );
    });
};

startServer().catch((err) => {
    console.error("Server failed to start:", err);
});
