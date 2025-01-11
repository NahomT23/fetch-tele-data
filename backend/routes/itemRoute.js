// routes/itemRoutes.js
import express from "express";
import { handleTelegramMessages } from "../controllers/telegramController.js"; // Import the Telegram controller
import { getAllItems, getItemById } from "../controllers/itemController.js";
const router = express.Router();

// Define routes for item-related endpoints
router.get("/items", getAllItems);  // Get all items
router.get("/items/:id", getItemById); // Get item by ID

// Define the route for receiving Telegram messages
router.post("/getMessages", handleTelegramMessages); // Webhook for Telegram messages

export default router;
