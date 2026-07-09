import { ApiError } from "../utils/ApiError.js";

const notFound = (req, res, next) => {
    next(
        new ApiError(
            404,
            `Route not found - ${req.originalUrl}`
        )
    );
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message:
            err.message || "Internal Server Error",
        errors: err.errors || [],
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : null,
    });
};

export {
    notFound,
    errorHandler,
};