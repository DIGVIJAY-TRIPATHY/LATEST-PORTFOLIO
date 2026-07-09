import rateLimit from "express-rate-limit";

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many contact requests. Please try again later.",
    },
});

export { contactLimiter };