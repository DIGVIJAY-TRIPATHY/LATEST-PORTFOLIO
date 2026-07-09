import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 60,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },

        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
            maxlength: 120,
        },

        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            minlength: 20,
            maxlength: 2000,
        },

        status: {
            type: String,
            enum: ["unread", "read", "replied"],
            default: "unread",
        },
    },
    {
        timestamps: true,
    }
);

export const Contact = mongoose.model("Contact", contactSchema);