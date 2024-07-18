import cartDataModel from "../models/carts.model"



export const saveDataToDatabase = async ({ user_id, items }) => {
    return cartDataModel.create({
        user_id: user_id,
        items: items
    })
}

export const getDataByID = async ({ user_id }) => {
     return cartDataModel.find({user_id: user_id})
}