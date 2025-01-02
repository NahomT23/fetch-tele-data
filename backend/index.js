// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = 5000;
// const BOT_TOKEN = process.env.BOT_TOKEN;
// const CHAT_ID = process.env.CHAT_ID;

// let items = [];
// let nextItemId = 1;

// const getFileUrl = async (fileId) => {
//     try {
//         const filePathResponse = await axios.get(
//             `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
//         );
//         const filePath = filePathResponse.data.result.file_path;
//         return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
//     } catch (error) {
//         console.error("Error fetching image:", error);
//         return null;
//     }
// };

// // Webhook to receive messages from Telegram
// app.post('/api/getMessages', async (req, res) => {
//     try {
//         const message =
//             req.body.message ||
//             req.body.edited_message ||
//             req.body.channel_post ||
//             req.body.edited_channel_post;

//         if (message) {
//             const { caption, photo, message_id, media_group_id } = message;

//             let item = items.find((item) => item.media_group_id === media_group_id);


//             if (caption) {
//                 const lines = caption.split('\n').map(line => line.trim());
            
//                 const name = lines[0] || '';
//                 const description = lines[1] || '';
//                 const price = lines[2] ? lines[2].replace(/,/g, '') : ''; // Remove commas
//                 const specs = lines.slice(3).join('\n');
            
//                 if (caption.includes('DELETE')) {
//                     items = items.filter((item) => item.media_group_id !== media_group_id);
//                     return res.send('Item deleted');
//                 }
            
//                 if (!item) {
//                     item = {
//                         id: nextItemId++,
//                         message_id,
//                         media_group_id,
//                         name,
//                         description,
//                         price,
//                         specs,
//                         imageUrls: [],
//                     };
//                     items.push(item);
//                 } else {
//                     item.name = name || item.name;
//                     item.description = description || item.description;
//                     item.price = price || item.price; // Update price after removing commas
//                     item.specs = specs || item.specs;
//                 }
//             }
            

//             if (photo) {
//                 const largestPhoto = photo[photo.length - 1];
//                 const imageUrl = await getFileUrl(largestPhoto.file_id);
//                 if (imageUrl) {
//                     if (!item) {
//                         item = {
//                             id: nextItemId++,
//                             message_id,
//                             media_group_id,
//                             imageUrls: [imageUrl],
//                         };
//                         items.push(item);
//                     } else if (!item.imageUrls.includes(imageUrl)) {
//                         item.imageUrls.push(imageUrl);
//                     }
//                 }
//             }
//         }
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error processing the message:', error);
//         res.sendStatus(500);
//     }
// });

// // Endpoint to get all items
// app.get('/api/items', (req, res) => {
//     res.json(items);
// });

// // Endpoint to get item IDs
// app.get('/api/item-ids', (req, res) => {
//     res.json({ itemIds: items.map(item => item.id) });
// });


// // webhook configuration 

// // const setWebhook = async () => {
// //     try {
// //         const webhookUrl = 'https://97bc-102-213-69-34.ngrok-free.app/api/getMessages';
// //         const response = await axios.post(
// //             `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
// //             {
// //                 url: webhookUrl,
// //             }
// //         );
// //         console.log('Webhook set:', response.data);
// //     } catch (error) {
// //         console.error('Error setting webhook:', error.response?.data || error.message);
// //     }
// // };

// // setWebhook();


// const setWebhook = async () => {
//     try {
//         const webhookUrl = `https://fetch-tele-data.vercel.app/api/getMessages`;
//         const response = await axios.post(
//             `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
//             {
//                 url: webhookUrl,
//             }
//         );
//         console.log('Webhook set:', response.data);
//     } catch (error) {
//         console.error(
//             'Error setting webhook:',
//             error.response ? error.response.data : error.message
//         );
//     }
// };

// setWebhook();


// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });




import { collection, addDoc, doc, updateDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./config/firebase.js";
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

let items = [];
let nextItemId = 1;

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

// Webhook to receive messages from Telegram
// app.post('/api/getMessages', async (req, res) => {
//     try {
//         const message =
//             req.body.message ||
//             req.body.edited_message ||
//             req.body.channel_post ||
//             req.body.edited_channel_post;

//         if (message) {
//             const { caption, photo, message_id, media_group_id } = message;

//             let item = items.find((item) => item.media_group_id === media_group_id);


//             if (caption) {
//                 const lines = caption.split('\n').map(line => line.trim());
            
//                 const name = lines[0] || '';
//                 const description = lines[1] || '';
//                 const price = lines[2] ? lines[2].replace(/,/g, '') : ''; // Remove commas
//                 const specs = lines.slice(3).join('\n');
            
//                 if (caption.includes('DELETE')) {
//                     items = items.filter((item) => item.media_group_id !== media_group_id);
//                     return res.send('Item deleted');
//                 }
            
//                 if (!item) {
//                     item = {
//                         id: nextItemId++,
//                         message_id,
//                         media_group_id,
//                         name,
//                         description,
//                         price,
//                         specs,
//                         imageUrls: [],
//                     };
//                     items.push(item);
//                 } else {
//                     item.name = name || item.name;
//                     item.description = description || item.description;
//                     item.price = price || item.price; // Update price after removing commas
//                     item.specs = specs || item.specs;
//                 }
//             }
            

//             if (photo) {
//                 const largestPhoto = photo[photo.length - 1];
//                 const imageUrl = await getFileUrl(largestPhoto.file_id);
//                 if (imageUrl) {
//                     if (!item) {
//                         item = {
//                             id: nextItemId++,
//                             message_id,
//                             media_group_id,
//                             imageUrls: [imageUrl],
//                         };
//                         items.push(item);
//                     } else if (!item.imageUrls.includes(imageUrl)) {
//                         item.imageUrls.push(imageUrl);
//                     }
//                 }
//             }
//         }
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error processing the message:', error);
//         res.sendStatus(500);
//     }
// });

app.post("/api/getMessages", async (req, res) => {
  try {
    const message = req.body.message || req.body.channel_post;

    if (message) {
      const { caption, photo, message_id, media_group_id } = message;

      if (caption) {
        const lines = caption.split("\n").map(line => line.trim());
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
          const itemRef = collection(db, "items");
          const q = query(
            itemRef,
            where("media_group_id", "==", media_group_id)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnap) => {
              const existingItem = docSnap.data();
              if (!existingItem.imageUrls.includes(imageUrl)) {
                existingItem.imageUrls.push(imageUrl);
                await updateDoc(doc(db, "items", docSnap.id), {
                  imageUrls: existingItem.imageUrls,
                });
              }
            });
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




// Endpoint to get all items
// app.get('/api/items', (req, res) => {
//     res.json(items);
// });


app.get("/api/items", async (req, res) => {
    try {
      const itemsSnapshot = await getDocs(collection(db, "items"));
      const items = itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.sendStatus(500);
    }
  });
  

// Endpoint to get item IDs
app.get('/api/item-ids', (req, res) => {
    res.json({ itemIds: items.map(item => item.id) });
});





// webhook configuration 

// const setWebhook = async () => {
//     try {
//         const webhookUrl = 'https://97bc-102-213-69-34.ngrok-free.app/api/getMessages';
//         const response = await axios.post(
//             `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
//             {
//                 url: webhookUrl,
//             }
//         );
//         console.log('Webhook set:', response.data);
//     } catch (error) {
//         console.error('Error setting webhook:', error.response?.data || error.message);
//     }
// };

// setWebhook();


const setWebhook = async () => {
    try {
        const webhookUrl = `https://fetch-tele-data.vercel.app/api/getMessages`;
        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
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

setWebhook();


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});


