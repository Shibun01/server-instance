import userDataModel from "../models/users.model.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';



export const saveDataToDatabase = async (data) => {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return userDataModel.create({
        name: data.username,
        email: data.email,
        password: passwordHash
    })
};


export const loginFromDatabase = async (data) => {
    let email = data.email;
    let password = data.password;
    const user = await userDataModel.findOne({email: email});
    if (!user) {
        console.log("User not found");
        return next(new ApiError(401, "Invalid email or password"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log("Password comparison failed");
        return next(new ApiError(401, "Invalid email or password"));
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {user, token}
}