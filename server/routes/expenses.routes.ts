import { Router } from "express";
import { createExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expenses.controllers.ts";
import auth from "../middleware/auth.middleware.ts";
import { asyncHandler } from "../lib/utils/AsyncHandler.ts";

const router = Router();
router.use(auth);

router.post("/", asyncHandler(createExpense));
router.patch("/:id", asyncHandler(updateExpense));
router.delete("/:id", asyncHandler(deleteExpense));
router.get("/", asyncHandler(getExpenses));

export default router