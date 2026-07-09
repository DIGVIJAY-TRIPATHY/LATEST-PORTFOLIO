import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    sendContactNotification,
    sendAutoReply,
} from "../utils/mailer.js";

const submitContact = asyncHandler(async (req, res) => {
    let { name, email, subject, message } = req.body;

    name = name.trim();
    email = email.trim().toLowerCase();
    subject = subject.trim();
    message = message.trim();

    const existingContact = await Contact.findOne({
        email,
        subject,
        message,
    });

    if (existingContact) {
        throw new ApiError(
            409,
            "You have already submitted this message."
        );
    }

    const contact = await Contact.create({
        name,
        email,
        subject,
        message,
        ipAddress: req.ip,
    });

    if (!contact) {
        throw new ApiError(
            500,
            "Failed to save contact message."
        );
    }

    await sendContactNotification({
        name,
        email,
        subject,
        message,
    });

    await sendAutoReply({
        name,
        email,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            contact,
            "Message sent successfully."
        )
    );
});

const getHealth = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                status: "OK",
                uptime: process.uptime(),
                timestamp: new Date(),
            },
            "API is healthy."
        )
    );
});

export {
    submitContact,
    getHealth,
};