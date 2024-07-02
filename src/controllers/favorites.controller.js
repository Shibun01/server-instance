import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import * as favoriteService from '../services/favorite.services.js'
import ApiResponse from "../utils/ApiResponse.js";


const createFavorites = AsyncHandler(async (req, res, next) => {
    try {
        const { user_id, shop_id } = req.body;
        const dataObj = { user_id, shop_id };
        const favorite = await favoriteService.saveDataToDatabase(dataObj);
        if (favorite) {
            return res.status(200).json(
                new ApiResponse(200, "Favorite stored successfully!!", favorite)
            )
        }
    } catch (error) {
        console.error("Error in storing favorite:", error);
        if (error instanceof ApiError) {
            return next(error);
        }
        
        next(new ApiError(500, "Internal Server Error"));
    }
})


export {
    createFavorites
}