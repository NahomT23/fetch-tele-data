// controllers/telegramController.js
import * as telegramService from "../services/telegramService.js"; // Assuming you've created the service already
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js"; // Firebase configuration
import axios from "axios";

// Function to handle incoming Telegram messages
export const handleTelegramMessages = async (req, res) => {
  try {
    const message = req.body.message || req.body.edited_message || req.body.channel_post || req.body.edited_channel_post;

    if (message) {
      const { caption, photo, message_id, media_group_id } = message;

      if (caption) {
        const lines = caption.split("\n").map((line) => line.trim());
        const name = lines[0] || "";
        const description = lines[1] || "";
        const price = lines[2] ? lines[2].replace(/,/g, "") : "";
        const specs = lines.slice(3).join("\n");

        if (caption.includes("DELETE")) {
          const q = query(collection(db, "items"), where("media_group_id", "==", media_group_id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (docSnap) => {
            await deleteDoc(doc(db, "items", docSnap.id));
          });
          return res.send("Item deleted");
        }

        const item = {
          message_id,
          media_group_id,
          name,
          description,
          price,
          specs,
          imageUrls: [],
        };

        const itemRef = collection(db, "items");
        await addDoc(itemRef, item);
      }

      if (photo) {
        const largestPhoto = photo[photo.length - 1];
        const imageUrl = await telegramService.getFileUrl(largestPhoto.file_id);

        if (imageUrl) {
          const permanentUrl = await telegramService.uploadToFirebase(largestPhoto.file_id, imageUrl);

          if (permanentUrl) {
            const itemRef = collection(db, "items");
            const q = query(itemRef, where("media_group_id", "==", media_group_id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach(async (docSnap) => {
                const existingItem = docSnap.data();
                if (!existingItem.imageUrls.includes(permanentUrl)) {
                  existingItem.imageUrls.push(permanentUrl);
                  await updateDoc(doc(db, "items", docSnap.id), {
                    imageUrls: existingItem.imageUrls,
                  });
                }
              });
            }
          }
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing the message:", error);
    res.sendStatus(500);
  }
};


// controllers/telegramController.js

export const setWebhook = async () => {
    try {
      const webhookUrl = `https://fetch-tele-data.vercel.app/api/getMessages`;                   
      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`,
        {
          url: webhookUrl,
        }
      );
      console.log('Webhook set:', response.data);
    } catch (error) {
      console.error(
        'Error setting webhook:',
        error.response ? error.response.data : error.message
      );
    }
  };
  