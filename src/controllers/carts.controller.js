import AsyncHandler from "../utils/AsyncHandler";
import * as cartService from "../services/carts.services.js"
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";



const createCart = AsyncHandler(async (req, res, next) => {
    try {
        const { user_id, items } = req.body;
        const storeCart = cartService.saveDataToDatabase({ user_id, items });
        if (storeCart) {
            return res.status(200).json(
                new ApiResponse(200, "Cart saved successfully!!", storeCart)
            )
        }
    } catch (error) {
        console.error("Error storing a cart: ", error);
        if (error instanceof ApiError) {
            return next(error);
        }

        next(new ApiError(500, "Internal Server Error"));
    }
})


const getCartById = AsyncHandler(async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const getCart = cartService.getDataByID({ user_id });
        if (getCart) {
            return res.status(200).json(
                new ApiResponse(200, "Cart fetched successfully!!", getCart)
            )
        }
    } catch (error) {
        console.error("Error fetching a cart: ", error);
        if (error instanceof ApiError) {
             return next(error);
        }

        next(new ApiError(500, "Internal Server Error"))
    }
})


export {
    createCart,
    getCartById
}