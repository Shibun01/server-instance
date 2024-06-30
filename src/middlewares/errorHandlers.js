import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            success: err.success,
            data: err.data,
            errors: err.errors,
        });
    }

    console.error("Unexpected error:", err);
    return res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        success: false,
        errors: [],
    });
};

export default errorHandler;
