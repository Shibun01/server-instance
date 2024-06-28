import { Router } from "express";
import { ProductValidationRules, validate } from "../validators/productsValidator.js";
import { createCoffeeShopProduct, getProductByShopID } from "../controllers/products.controller.js";





const router = Router();


router.route('/create').post(
    ProductValidationRules(),
    validate,
    createCoffeeShopProduct
)

router.route('/getByID').get(
    getProductByShopID
)


export default router;