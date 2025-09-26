// service/emergency.service.js
import { User } from "../models/user.model.js";
import { getWhatsAppClient } from "../utils/whatsapp.js";

export const notifyEmergencyContacts = async (userId, emergencyData) => {
  const { type, urgency, patientName, location, bloodType, organType } = emergencyData;

  // 1️⃣ Fetch user
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // 2️⃣ Get emergency contacts from personalInfo
  const contacts = user.personalInfo?.emergencyContacts || [];
  if (!contacts.length) {
    throw new Error("No emergency contacts available for this user");
  }

  // 3️⃣ WhatsApp client
  const client = await getWhatsAppClient();

  // 4️⃣ Emergency message
  const message = `🚨 *Emergency SOS Alert* 🚨
Type: ${type}
Urgency: ${urgency}
Patient: ${patientName}
Location: ${location}
Required: ${bloodType || organType || "N/A"}

Sent by: ${user.fullName || user.username}
  `;

  // 5️⃣ Send to all contacts
  const results = [];
  for (const contact of contacts) {
  try {
    const phoneNumber = contact.phone.replace(/\D/g, "");
    const chatId = `91${phoneNumber}@c.us`; // include country code

    await client.sendMessage(chatId, message);
    await new Promise(resolve => setTimeout(resolve, 500));

    results.push({ name: contact.name, phone: contact.phone, status: "sent" });
  } catch (err) {
    console.error(`❌ Failed to send to ${contact.phone}:`, err.message);
    results.push({ name: contact.name, phone: contact.phone, status: "failed", error: err.message });
  }
}


  return results;
};
