import { ApiError } from "../utils/ApiError.js";

const validateContact = (req, res, next) => {
    const { name, email, subject, message } = req.body;

    if (!name || name.trim().length < 2) {
        throw new ApiError(
            400,
            "Name must contain at least 2 characters."
        );
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(
            400,
            "Please enter a valid email."
        );
    }

    if (!subject || subject.trim() === "") {
        throw new ApiError(
            400,
            "Subject is required."
        );
    }

    if (!message || message.trim().length < 20) {
        throw new ApiError(
            400,
            "Message should contain at least 20 characters."
        );
    }

    next();
};

export { validateContact };