import { Router } from "express";
import {
    verifyEmailHandler,
    forgotPasswordHandler,
    loginHandler,
    logoutHandler,
    registerHandler,
    resendEmailHandler,
} from "../controllers/auth.controllers.ts";
import auth from "../middleware/auth.middleware.ts";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/verify-email", auth, verifyEmailHandler);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/logout", auth, logoutHandler);
router.post("/resend-email", auth, resendEmailHandler);

export default router;
