import {
    addItem,
    updateItemImages,
    fetchItems,
    fetchItemById,
    deleteItemByMediaGroupId,
  } from "../services/itemService.js";
  
  export const getItems = async (req, res) => {
    try {
      const items = await fetchItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.sendStatus(500);
    }
  };
  
  export const getItemById = async (req, res) => {
    const { id } = req.params;
    try {
      const item = await fetchItemById(id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ message: "Error fetching item details" });
    }
  };
  
  export const createItem = async (req, res) => {
    try {
      const message = req.body.message || req.body.channel_post;
      if (message) {
        const { caption, photo, media_group_id } = message;
  
        if (caption && caption.includes("DELETE")) {
          await deleteItemByMediaGroupId(media_group_id);
          return res.send("Item deleted");
        }
  
        if (caption) await addItem(message);
  
        if (photo) await updateItemImages(photo, media_group_id);
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Error processing the message:", error);
      res.sendStatus(500);
    }
  };
  
