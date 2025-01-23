import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import routes from "./routes/routes.js";
import { createCheckoutSession } from "./controllers/paymentController.js";


dotenv.config();

const app = express();
const PORT = 5000;
const BOT_TOKEN = process.env.BOT_TOKEN;


app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

// app.post("/create-checkout-session", createCheckoutSession);

// Set Telegram Webhook
const setWebhook = async () => {
  try {
    const webhookUrl = `https://fetch-tele-data.vercel.app/api/getMessages`;
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      { url: webhookUrl }
    );
    console.log("Webhook set:", response.data);
  } catch (error) {
    console.error(
      "Error setting webhook:",
      error.response ? error.response.data : error.message
    );
  }
};

setWebhook();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


