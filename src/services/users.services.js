import userDataModel from "../models/users.model.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';




export const saveDataToDatabase = async (data) => {
    const existingUser = await userDataModel.findOne({ email: data.email });
    if (existingUser) {
        console.log('Email address already registered');
        throw new ApiError(400, "Email already registered");
    }
    const passwordHash = await bcrypt.hash(data.password, 10);

    return userDataModel.create({
        name: data.name,
        email: data.email,
        password: passwordHash
    });
};



export const loginFromDatabase = async (data) => {
    const email = data.email;
    const password = data.password;
    const user = await userDataModel.findOne({ email: email });

    if (!user) {
        console.log("User not found");
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log("Password comparison failed");
        throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
};