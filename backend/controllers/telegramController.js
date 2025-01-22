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
  

  export const getFileUrl = async (fileId, BOT_TOKEN) => {
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
  