// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";
// import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage } from "./config/firebase.js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = 5000;
// const BOT_TOKEN = process.env.BOT_TOKEN;

// // Function to get temporary image URL from Telegram
// const getFileUrl = async (fileId) => {
//   try {
//     const filePathResponse = await axios.get(
//       `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
//     );
//     const filePath = filePathResponse.data.result.file_path;
//     return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return null;
//   }
// };

// // Function to upload image to Firebase Storage and get permanent URL
// const uploadToFirebase = async (fileId, imageUrl) => {
//   try {
//     const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
//     const fileName = `images/${fileId}.jpg`;
//     const storageRef = ref(storage, fileName);

//     // Upload image to Firebase Storage
//     await uploadBytes(storageRef, response.data);

//     // Get the permanent URL
//     const permanentUrl = await getDownloadURL(storageRef);
//     return permanentUrl;
//   } catch (error) {
//     console.error("Error uploading to Firebase:", error);
//     return null;
//   }
// };

// // API Endpoint to handle Telegram messages
// app.post("/api/getMessages", async (req, res) => {
//   try {
//     const message =
//     req.body.message ||
//     req.body.edited_message ||
//     req.body.channel_post ||
//     req.body.edited_channel_post;

//     if (message) {
//       const { caption, photo, message_id, media_group_id } = message;

//       if (caption) {
//         const lines = caption.split("\n").map((line) => line.trim());
//         const name = lines[0] || "";
//         const description = lines[1] || "";
//         const price = lines[2] ? lines[2].replace(/,/g, "") : "";
//         const specs = lines.slice(3).join("\n");

//         if (caption.includes("DELETE")) {
//           const q = query(
//             collection(db, "items"),
//             where("media_group_id", "==", media_group_id)
//           );
//           const querySnapshot = await getDocs(q);
//           querySnapshot.forEach(async (docSnap) => {
//             await deleteDoc(doc(db, "items", docSnap.id));
//           });
//           return res.send("Item deleted");
//         }

//         const item = {
//           message_id,
//           media_group_id,
//           name,
//           description,
//           price,
//           specs,
//           imageUrls: [],
//         };

//         const itemRef = collection(db, "items");
//         await addDoc(itemRef, item);
//       }

      
//       if (photo) {
//         const largestPhoto = photo[photo.length - 1];
//         const imageUrl = await getFileUrl(largestPhoto.file_id);

//         if (imageUrl) {
//           const permanentUrl = await uploadToFirebase(largestPhoto.file_id, imageUrl);

//           if (permanentUrl) {
//             const itemRef = collection(db, "items");
//             const q = query(
//               itemRef,
//               where("media_group_id", "==", media_group_id)
//             );
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//               querySnapshot.forEach(async (docSnap) => {
//                 const existingItem = docSnap.data();
//                 if (!existingItem.imageUrls.includes(permanentUrl)) {
//                   existingItem.imageUrls.push(permanentUrl);
//                   await updateDoc(doc(db, "items", docSnap.id), {
//                     imageUrls: existingItem.imageUrls,
//                   });
//                 }
//               });
//             }
//           }
//         }
//       }
//     }

//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error processing the message:", error);
//     res.sendStatus(500);
//   }
// });

// app.get("/api/items", async (req, res) => {
//   try {
//     const itemsSnapshot = await getDocs(collection(db, "items"));
//     const items = itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.json(items);
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.sendStatus(500);
//   }
// });

// app.get('/api/item-ids', (req, res) => {
//   res.json({ itemIds: items.map(item => item.id) });
// });

// app.get('/api/items/:id', async (req, res) => {
// const { id } = req.params;

// try {
//   // Fetch the item from Firestore by its ID
//   const itemDoc = await getDoc(doc(db, 'items', id));

//   if (itemDoc.exists()) {
//     // Send the item data as the response
//     res.json({ id: itemDoc.id, ...itemDoc.data() });
//   } else {
//     // If item is not found
//     res.status(404).json({ message: 'Item not found' });
//   }
// } catch (error) {
//   console.error('Error fetching item:', error);
//   res.status(500).json({ message: 'Error fetching item details' });
// }
// });

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: req.body.items.map(item => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: item.name,

//           },
//           unit_amount: Math.round(item.price * 100), // Convert price to cents
//         },
//         quantity: item.quantity,
//       })),
//       mode: 'payment',
//       success_url: `${CLIENT_URL}/success`,
//       cancel_url: `${CLIENT_URL}/cart`,
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error('Error creating checkout session:', err);
//     res.status(500).json({ message: 'Internal Server Error', error: err.message });
//   }
// });

// const setWebhook = async () => {
//   try {
//       const webhookUrl = `https://fetch-tele-data.vercel.app/api/getMessages`;                   
//       const response = await axios.post(
//           `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
//           {
//               url: webhookUrl,
//           }
//       );
//       console.log('Webhook set:', response.data);
//   } catch (error) {
//       console.error(
//           'Error setting webhook:',
//           error.response ? error.response.data : error.message
//       );
//   }
// };

// setWebhook();


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });


// // index.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import itemRoutes from "./routes/itemRoute.js"; // Import item routes
// import { setWebhook } from "./controllers/telegramController.js"; // Import webhook function

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Set the Telegram webhook when the server starts
// setWebhook(); 

// // Use routes for all item-related and Telegram routes
// app.use("/api", itemRoutes); // All routes are prefixed with /api

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });


// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoute.js"; // Import item routes
import { setWebhook } from "./controllers/telegramController.js"; // Import webhook function

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Set the Telegram webhook when the server starts
setWebhook(); 

// Use routes for all item-related and Telegram routes
app.use("/api", itemRoutes); // All routes are prefixed with /api

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
