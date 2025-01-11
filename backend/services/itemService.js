import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const addItem = async (item) => {
  const itemRef = collection(db, "items");
  return await addDoc(itemRef, item);
};

export const deleteItemByMediaGroupId = async (mediaGroupId) => {
  const q = query(collection(db, "items"), where("media_group_id", "==", mediaGroupId));
  const querySnapshot = await getDocs(q);
  const deletions = [];
  querySnapshot.forEach((docSnap) => deletions.push(deleteDoc(doc(db, "items", docSnap.id))));
  await Promise.all(deletions);
};

export const getAllItems = async () => {
  const itemsSnapshot = await getDocs(collection(db, "items"));
  return itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateItemImages = async (mediaGroupId, permanentUrl) => {
  const itemRef = collection(db, "items");
  const q = query(itemRef, where("media_group_id", "==", mediaGroupId));
  const querySnapshot = await getDocs(q);

  const updates = [];
  querySnapshot.forEach(async (docSnap) => {
    const existingItem = docSnap.data();
    if (!existingItem.imageUrls.includes(permanentUrl)) {
      existingItem.imageUrls.push(permanentUrl);
      updates.push(updateDoc(doc(db, "items", docSnap.id), { imageUrls: existingItem.imageUrls }));
    }
  });
  await Promise.all(updates);
};

export const getItemById = async (id) => {
  const itemDoc = await getDoc(doc(db, "items", id));
  if (itemDoc.exists()) {
    return { id: itemDoc.id, ...itemDoc.data() };
  } else {
    throw new Error("Item not found");
  }
};
