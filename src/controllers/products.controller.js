import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import * as productService from "../services/products.services.js"
import ApiResponse from "../utils/ApiResponse.js";




const createCoffeeShopProduct = AsyncHandler(async (req, res, next) => {
    try {
        const { shop_id, name, description, price, category, image_url } = req.body;
        const dataObj = { shop_id, name, description, price, category, image_url };
        const createProduct = await productService.saveDataToDatabase(dataObj);
        if (createProduct) {
            return res.status(200).json(
                new ApiResponse(200, "Product stored successfully!!", createProduct)
            )
        }
    } catch (error) {
        console.error("Error creating a product: ", error);
        next(new ApiError(500, "Internal Server Error"))
    }
})


const getProductByShopID = AsyncHandler(async (req, res, next) => {
    try {
        const { shop_id } = req.query;
        const productByShopID = await productService.getProductsByShopID(shop_id);
        if (productByShopID) {
            return res.status(200).json(
                new ApiResponse(200, "Product fetched successfully!!", productByShopID)
            )
        }
    } catch (error) {
        console.error("Error getting the product");
        next(new ApiError(500, "Internal Server Error"))
    }
})

export {
    createCoffeeShopProduct,
    getProductByShopID
}