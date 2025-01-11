import axios from "axios";

export const setTelegramWebhook = async (webhookUrl, botToken) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/setWebhook`,
      { url: webhookUrl }
    );
    console.log("Webhook set:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error setting webhook:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to set Telegram webhook");
  }
};
