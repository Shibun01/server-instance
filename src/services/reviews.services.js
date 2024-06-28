import reviewDataModel from "../models/reviews.model.js"




export const saveDataToDatabase = async (data) => {
   return reviewDataModel.create({
     shop_id: data.shop_id,
     user_id: data.user_id,
     rating: data.rating,
     comment: data.comment
   })
}
