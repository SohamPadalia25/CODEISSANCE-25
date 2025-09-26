// routes/emergency.routes.js
import express from "express";
import { contactEmergencyContactsController } from "../controllers/emergency.controller.js";

const router = express.Router();

router.post("/send-emergency", contactEmergencyContactsController);

export default router;
