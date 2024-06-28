import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js";
import { loginValidationRules, registerValidationRules, validate } from "../validators/usersValidator.js";

const router = Router();

router.route("/register").post(
    registerValidationRules(),
    validate,
    registerUser
)

router.route("/login").post(
    loginValidationRules(),
    validate,
    loginUser
)


export default router;