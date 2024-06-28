import favoriteDataModel from "../models/favorites.model.js"


export const saveDataToDatabase = async (data) => {
    return favoriteDataModel.create({
        shop_id: data.shop_id,
        user_id: data.user_id
    })
}