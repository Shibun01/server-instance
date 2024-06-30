import { Router } from "express";
import { ShopValidationRules, validate } from "../validators/shopsValidator.js";
import { createCoffeeShop, getAllCoffeeShops, getCoffeeShopsByID } from "../controllers/shops.controller.js";


const router = Router();

router.route('/create').post(
    ShopValidationRules(),
    validate,
    createCoffeeShop
)

router.route('/getAll').get(
    getAllCoffeeShops
)

router.route('/getByID').get(
    getCoffeeShopsByID
)

export default router;