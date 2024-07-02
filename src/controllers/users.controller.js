    import ApiError from "../utils/ApiError.js";
    import AsyncHandler from "../utils/AsyncHandler.js";
    import * as userService from "../services/users.services.js";
    import ApiResponse from "../utils/ApiResponse.js";


    const registerUser = AsyncHandler(async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const dataObj = {
                name,
                email,
                password
            }

            const createUser = await userService.saveDataToDatabase(dataObj);
                return res.status(200).json(
                    new ApiResponse(200, "User registered successfully!!!", createUser)
                )
        } catch (error) {
            console.error("Error in registerUser:", error);
            if (error instanceof ApiError) {
                return next(error);
            }
            
            next(new ApiError(500, "Internal Server Error"));
        }
    });

    const loginUser = AsyncHandler(async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const dataObj = { email, password };
            
            const login = await userService.loginFromDatabase(dataObj);
            return res.status(200).json(
                new ApiResponse(200, "User logged in successfully!!!", { user: login.user, token: login.token })
            );
        } catch (error) {
            console.error("Error in Logging User:", error);
            
            if (error instanceof ApiError) {
                return next(error);
            }
            
            next(new ApiError(500, "Internal Server Error"));
        }
    });

    export {
        registerUser,
        loginUser
    }