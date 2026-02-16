import { Router } from "express";
import { asyncHandler } from "../lib/utils/asyncHandler.ts";
import auth from "../middleware/auth.middleware.ts";
import {
    createSubscription,
    deleteSubscription,
    getSubscriptions,
    updateSubscription,
} from "../controllers/subscriptions.controllers.ts";

const router = Router();
router.use(auth);
router.post("/", asyncHandler(createSubscription));
router.get("/", asyncHandler(getSubscriptions));
router.delete("/:id", asyncHandler(deleteSubscription));
router.patch("/:id", asyncHandler(updateSubscription));

export default router;