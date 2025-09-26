// controllers/emergency.controller.js
import * as emergencyService from "../service/emergency.service.js";

export const contactEmergencyContactsController = async (req, res) => {
  try {
    const { userId, emergencyData } = req.body;

    const contacts = await emergencyService.notifyEmergencyContacts(userId, emergencyData);

    res.json({
      message: "WhatsApp alerts sent to emergency contacts",
      contacts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
