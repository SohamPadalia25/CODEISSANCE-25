import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";

const { Client, LocalAuth } = pkg;

let client;
let ready = false; // flag to track readiness

export const initWhatsApp = () => {
  client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("✅ WhatsApp client is ready");
    ready = true;
  });

  client.initialize();
};

// Returns client only when ready
export const getWhatsAppClient = async () => {
  if (!client) throw new Error("WhatsApp client not initialized");

  if (!ready) {
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (ready) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  return client;
};
