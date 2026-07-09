require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./db/db.js");
const contactRoutes = require("./routes/contact.route.js");
const { notFound, errorHandler } = require("./middleware/errorHandler.middleware.js");

const app = express();

// Trust the first proxy hop (needed for correct req.ip behind Render/Heroku/Nginx)
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "*",
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();

module.exports = app;