import express from "express";
import { getItems, getItemById, createItem } from "../controllers/itemController.js";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/getMessages", createItem);
router.get("/items", getItems);
router.get("/items/:id", getItemById);
router.post("/create-checkout-session", createCheckoutSession);

export default router;
