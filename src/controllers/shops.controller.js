import AsyncHandler from "../utils/AsyncHandler.js";
import * as ShopService from "../services/shops.services.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";



const createCoffeeShop = AsyncHandler(async (req, res, next) => {
    try {
        const { name, location, rating, description, images } = req.body;
        const dataObj = { name, location, rating, description, images  }
        const createShop = await ShopService.saveDataToDatabase(dataObj);
        if (createShop) {
            return res.status(200).json(
                new ApiResponse(200, "Coffee shop stored successfully!!!", createShop)
            )
        }
    } catch (error) {
        console.error("Error in creating Coffee Shop:", error);
        next(new ApiError(500, "Internal Server Error"));
    }
});


const getAllCoffeeShops = AsyncHandler(async (req, res, next) => {
    try {
        const getAllShops = await ShopService.getAllDataFromDatabase();
        if (getAllShops) {
            return res.status(200).json(
                new ApiResponse(200, "All Coffee Shops fetched successfully!!",getAllShops)
            )
        }
    } catch (error) {
        console.error("Error in getting the Coffee Shop:", error);
        next(new ApiError(500, "Internal Server Error"));
    }
})



export {
    createCoffeeShop,
    getAllCoffeeShops
}