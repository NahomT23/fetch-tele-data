import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { getFileUrl } from "../controllers/telegramController.js";
import Stripe from 'stripe';

import dotenv from "dotenv";
dotenv.config();


const CLIENT_URL = process.env.CLIENT_URL
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const addItem = async (message) => {
//   const { caption, message_id, media_group_id } = message;
//   const lines = caption.split("\n").map((line) => line.trim());
//   const name = lines[0] || "";
//   const description = lines[1] || "";
//   const price = lines[2] ? lines[2].replace(/,/g, "") : "";
//   const specs = lines.slice(3).join("\n");

//   const itemRef = collection(db, "items");
//   const item = {
//     message_id,
//     media_group_id,
//     name,
//     description,
//     price,
//     specs,
//     imageUrls: [],
//   };

//   await addDoc(itemRef, item);
// };

// export const updateItemImages = async (photo, media_group_id) => {
//   const largestPhoto = photo[photo.length - 1];
//   const imageUrl = await getFileUrl(largestPhoto.file_id, process.env.BOT_TOKEN);

//   if (imageUrl) {
//     const itemRef = collection(db, "items");
//     const q = query(itemRef, where("media_group_id", "==", media_group_id));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       querySnapshot.forEach(async (docSnap) => {
//         const existingItem = docSnap.data();
//         if (!existingItem.imageUrls.includes(imageUrl)) {
//           existingItem.imageUrls.push(imageUrl);
//           await updateDoc(doc(db, "items", docSnap.id), {
//             imageUrls: existingItem.imageUrls,
//           });
//         }
//       });
//     }
//   }
// };

export const addItem = async (message) => {
  const { caption, message_id, media_group_id } = message;
  const lines = caption.split("\n").map((line) => line.trim());
  const name = lines[0] || "";
  const description = lines[1] || "";
  const price = lines[2] ? lines[2].replace(/,/g, "") : "";
  const specs = lines.slice(3).join("\n");

  const itemRef = collection(db, "items");
  const item = {
    message_id,
    media_group_id,
    name,
    description,
    price,
    specs,
    imageUrls: [], // Will store Base64-encoded image(s) here
  };

  await addDoc(itemRef, item);
};


export const updateItemImages = async (photo, media_group_id) => {
  const largestPhoto = photo[photo.length - 1];
  const base64Image = await getFileBase64(largestPhoto.file_id, process.env.BOT_TOKEN);

  if (base64Image) {
    const itemRef = collection(db, "items");
    const q = query(itemRef, where("media_group_id", "==", media_group_id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnap) => {
        const existingItem = docSnap.data();
        if (!existingItem.imageUrls.includes(base64Image)) {
          existingItem.imageUrls.push(base64Image);
          await updateDoc(doc(db, "items", docSnap.id), {
            imageUrls: existingItem.imageUrls,
          });
        }
      });
    }
  }
};

export const fetchItems = async () => {
  const itemsSnapshot = await getDocs(collection(db, "items"));
  return itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchItemById = async (id) => {
  const itemDoc = await getDoc(doc(db, "items", id));
  return itemDoc.exists() ? { id: itemDoc.id, ...itemDoc.data() } : null;
};

export const deleteItemByMediaGroupId = async (media_group_id) => {
  const q = query(collection(db, "items"), where("media_group_id", "==", media_group_id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, "items", docSnap.id));
  });
};

export const createStripeSession = async (items) => {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${CLIENT_URL}/success`,
    cancel_url: `${CLIENT_URL}/cart`,
  });
};

