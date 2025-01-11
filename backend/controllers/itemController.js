import * as itemService from "../services/itemService.js";


export const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ message: "Error fetching items" });
  }
};

// Fetch a single item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error.message);
    res.status(500).json({ message: "Error fetching item" });
  }
};

// Add a new item
export const addItem = async (req, res) => {
  try {
    const { name, description, price, specs } = req.body;
    const newItem = await itemService.addItem({ name, description, price, specs });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error.message);
    res.status(500).json({ message: "Error adding item" });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await itemService.deleteItem(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Error deleting item" });
  }
};




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import itemRoutes from "./routes/itemRoute.js"; 
// import { setWebhook } from "./controllers/telegramController.js"; 

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());


// setWebhook(); 


// app.use("/api", itemRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });
