import { Router } from "express";
import { ReviewValidationRules, validate } from "../validators/reviewsValidator.js";
import { createReviews } from "../controllers/reviews.controller.js";


const router = Router();

router.route('/create').post(
    ReviewValidationRules(),
    validate,
    createReviews
)

export default router;