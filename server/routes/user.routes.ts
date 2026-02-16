import { Router } from "express";
import { me, updateMe } from "../controllers/user.controllers.ts";
import auth from "../middleware/auth.middleware.ts";
import { asyncHandler } from "../lib/utils/asyncHandler.ts";

const router = Router();

router.get("/me", auth, asyncHandler(me));
router.patch("/update/:id",auth, asyncHandler(updateMe));

export default router;
