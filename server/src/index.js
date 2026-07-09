import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `⚙️ Server is running on port ${PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(
            "MongoDB Connection Failed",
            error
        );
    });