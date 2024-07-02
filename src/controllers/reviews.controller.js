import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import * as reviewService from "../services/reviews.services.js";
import ApiResponse from "../utils/ApiResponse.js";



const createReviews = AsyncHandler(async (req, res, next) => {
    try {
        const {shop_id, user_id, rating, rating_number} = req.body;
        const dataObj = {shop_id, user_id, rating, rating_number};
        const review = await reviewService.saveDataToDatabase(dataObj);
        if(review){
            return res.status(200).json(
                new ApiResponse(200, "Review stored successfully!!", review)
            )
        }
    } catch (error) {
        console.error("Error in creating Product Reviews:", error);
        if (error instanceof ApiError) {
            return next(error);
        }
        
        next(new ApiError(500, "Internal Server Error"));
    }
})


export {
    createReviews
}