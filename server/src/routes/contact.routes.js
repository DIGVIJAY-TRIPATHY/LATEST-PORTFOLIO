import { Router } from "express";

import {
    submitContact,
    getHealth,
} from "../controllers/contact.controller.js";

import { validateContact } from "../middlewares/validateContact.middleware.js";

import { contactLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.route("/health").get(getHealth);

router
    .route("/")
    .post(
        contactLimiter,
        validateContact,
        submitContact
    );

export default router;