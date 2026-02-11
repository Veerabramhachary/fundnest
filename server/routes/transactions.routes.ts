import {Router} from 'express';

const router = Router();

router.get("/total-spend", ()=> {})

// /api/total-spend: Aggregate sum of expenses (use MongoDB $sum).
​

// /api/subscriptions: Count active + total cost (filter by status).
​

// /api/top-category: $group by category, sort descending.