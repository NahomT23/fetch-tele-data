import express from "express";
import { handleTelegramMessages } from "../controllers/telegramController.js";
import { getAllItems, getItemById } from "../controllers/itemController.js";
const router = express.Router();


router.get("/items", getAllItems);  // Get all items
router.get("/items/:id", getItemById); // Get item by ID


router.post("/getMessages", handleTelegramMessages);

export default router;
