import productDataModel from "../models/products.model.js"



export const saveDataToDatabase = async (data) => {
    return productDataModel.create({
        shop_id: data.shop_id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image_url: data.image_url
    })
}


export const getProductsByShopID = async (shop_id) => {
    return productDataModel.find({ shop_id: shop_id });
}