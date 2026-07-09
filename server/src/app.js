import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import contactRouter from "./routes/contact.routes.js";

import {
    notFound,
    errorHandler,
} from "./middlewares/error.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(
    cors({
        origin: process.env.CLIENT_URL
            ? process.env.CLIENT_URL.split(",")
            : "*",
        credentials: true,
    })
);

app.use(helmet());

app.use(
    express.json({
        limit: "10kb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
    })
);

if (process.env.NODE_ENV !== "test") {
    app.use(
        morgan(
            process.env.NODE_ENV === "production"
                ? "combined"
                : "dev"
        )
    );
}

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio Contact API",
    });
});

app.use("/api/v1/contact", contactRouter);

app.use(notFound);

app.use(errorHandler);

export { app };