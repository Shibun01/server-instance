import coffeeShopDataModel from "../models/shops.model.js"


export const saveDataToDatabase = async (data) => {
    return coffeeShopDataModel.create({
        name: data.name,
        location: data.location,
        rating: data.rating,
        description: data.description,
        images: data.images
    });
}


export const getAllDataFromDatabase = async() => {
    return coffeeShopDataModel.find();
}