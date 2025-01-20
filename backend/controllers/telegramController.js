// export const getFileUrl = async (fileId, BOT_TOKEN) => {
//     try {
//       const filePathResponse = await axios.get(
//         `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
//       );
//       const filePath = filePathResponse.data.result.file_path;
//       return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       return null;
//     }
//   };
  

import axios from "axios";
import fs from "fs";
import path from "path";

// Function to convert an image file to Base64
const convertImageToBase64 = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    return imageBuffer.toString('base64'); // Return the Base64 string
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return null;
  }
};

// Modify getFileUrl to fetch and convert the image to Base64
export const getFileBase64 = async (fileId, BOT_TOKEN) => {
  try {
    // Fetch file path from Telegram
    const filePathResponse = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
    );
    const filePath = filePathResponse.data.result.file_path;

    // Construct the URL to download the file
    const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
    
    // Convert the image to Base64
    const base64Image = await convertImageToBase64(imageUrl);
    return base64Image;
  } catch (error) {
    console.error("Error fetching and converting image:", error);
    return null;
  }
};
