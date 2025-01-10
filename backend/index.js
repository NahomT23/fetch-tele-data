import { collection, addDoc, doc, updateDoc, getDocs, deleteDoc, query, where, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config/firebase.js";

import express from "express";
import axios from "axios";
import cors from "cors";
import Stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_URL = process.env.CLIENT_URL


const getFileUrl = async (fileId) => {
  try {
    const filePathResponse = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
    );
    const filePath = filePathResponse.data.result.file_path;
    return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

const uploadImageToFirebase = async (imageUrl, fileName) => {
  try {
    // Fetch the image from Telegram's servers
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    // Create a reference in Firebase Storage
    const imageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(imageRef, buffer, { contentType: "image/jpeg" });

    // Get the download URL
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    return null;
  }
};

app.post("/api/getMessages", async (req, res) => {
  try {
    const message =
      req.body.message ||
      req.body.edited_message ||
      req.body.channel_post ||
      req.body.edited_channel_post;

    if (message) {
      const { caption, photo, message_id, media_group_id } = message;

      if (caption) {
        const lines = caption.split("\n").map((line) => line.trim());
        const name = lines[0] || "";
        const description = lines[1] || "";
        const price = lines[2] ? lines[2].replace(/,/g, "") : "";
        const specs = lines.slice(3).join("\n");

        if (caption.includes("DELETE")) {
          const q = query(
            collection(db, "items"),
            where("media_group_id", "==", media_group_id)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (docSnap) => {
            await deleteDoc(doc(db, "items", docSnap.id));
          });
          return res.send("Item deleted");
        }

        const itemRef = collection(db, "items");
        const item = {
          message_id,
          media_group_id,
          name,
          description,
          price,
          specs,
          imageUrls: [],
        };

        await addDoc(itemRef, item);
      }

      if (photo) {
        const largestPhoto = photo[photo.length - 1];
        const imageUrl = await getFileUrl(largestPhoto.file_id);

        if (imageUrl) {
          const fileName = `${media_group_id || message_id}-${Date.now()}.jpg`;
          const firebaseImageUrl = await uploadImageToFirebase(imageUrl, fileName);

          if (firebaseImageUrl) {
            const itemRef = collection(db, "items");
            const q = query(
              itemRef,
              where("media_group_id", "==", media_group_id)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach(async (docSnap) => {
                const existingItem = docSnap.data();
                if (!existingItem.imageUrls.includes(firebaseImageUrl)) {
                  existingItem.imageUrls.push(firebaseImageUrl);
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
});

app.get("/api/items", async (req, res) => {
  try {
    const itemsSnapshot = await getDocs(collection(db, "items"));
    const items = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.sendStatus(500);
  }
});

app.get("/api/item-ids", (req, res) => {
  res.json({ itemIds: items.map((item) => item.id) });
});

app.get("/api/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemDoc = await getDoc(doc(db, "items", id));

    if (itemDoc.exists()) {
      res.json({ id: itemDoc.id, ...itemDoc.data() });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Error fetching item details" });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,

          },
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

const setWebhook = async () => {
  try {
    const webhookUrl = `https://fetch-tele-data-p6pn.vercel.app/api/getMessages`;
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        url: webhookUrl,
      }
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


