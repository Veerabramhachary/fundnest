import { Router } from "express";
import {
    verifyEmailHandler,
    forgotPasswordHandler,
    loginHandler,
    logoutHandler,
    registerHandler,
    resendEmailHandler,
    resetPasswordHandler,
    refreshTokenHandler,
} from "../controllers/auth.controllers.ts";
import auth from "../middleware/auth.middleware.ts";
import { asyncHandler } from "../lib/utils/AsyncHandler.ts";

const router = Router();

router.post("/register", asyncHandler(registerHandler));
router.post("/login", asyncHandler(loginHandler));
router.post("/verify-email", auth, asyncHandler(verifyEmailHandler));
router.post("/forgot-password", asyncHandler(forgotPasswordHandler));
router.post("/reset-password", asyncHandler(resetPasswordHandler));
router.post("/logout", auth, asyncHandler(logoutHandler));
router.post("/resend-email", auth, asyncHandler(resendEmailHandler));
router.post("/refresh", asyncHandler(refreshTokenHandler))

export default router;
