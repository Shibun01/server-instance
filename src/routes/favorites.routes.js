import { Router } from "express";
import { FavoriteValidationRules, validate } from "../validators/favoritesValidator.js";
import { createFavorites } from "../controllers/favorites.controller.js";


const router = Router();



router.route('/create').post(
    FavoriteValidationRules(),
    validate,
    createFavorites
)


export default router;