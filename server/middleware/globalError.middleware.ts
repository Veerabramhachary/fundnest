import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        message: message,
        // only show stack trace in development
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    
    })
}