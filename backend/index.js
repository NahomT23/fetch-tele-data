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

// const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// let latestMessage = '';

// // ENDPOINT TO GET THE MESSAGES FROM TELEGRAM

// app.post('/api/getMessages', async (req, res) => {
//     try {
//         const message = req.body?.message?.text;

//         if (message) {
//             console.log(`User Message: ${message}`);
//             latestMessage = message;
//         } else {
//             console.log('No text message received');
//         }
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error processing the message:', error);
//         res.sendStatus(500);
//     }
// });

// // ENDPOINT TO SEND MESSAGES FROM THE WEBSITE TO TELEGRAM

// app.get('/api/send', async (req, res) => {
//     try {
//         const messageText = 'Text from the backend';

//         const response = await axios.post(TELEGRAM_API_URL, {
//             chat_id: CHAT_ID,
//             text: messageText,
//         });

//         console.log('Message sent:', response.data);
//         res.send('Message sent to Telegram');
//     } catch (error) {
//         console.error('Error sending message to Telegram:', error.response?.data || error.message);
//         res.status(500).send('Failed to send message');
//     }
// });



// // ENDPOINT TO STORE THE LATEST MESSAGES FROM TELEGRAM AND DISPLAY THEM IN THE FRONTEND

// app.get('/api/latestMessage', (req, res) => {
//     res.json({ message: latestMessage });
// });

// // ROOT ROUTE

// app.get('/', (req, res) => {
//     res.send('Welcome to the Telegram API');
// });

// // WEBHOOK TO MAKE GETTING MESSAGES FROM TELEGRAM POSSIBLE

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

const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
let items = [];
let nextItemId = 1;

// Function to get file URL from Telegram
const getFileUrl = async (fileId) => {
    try {
        const filePathResponse = await axios.get(`${TELEGRAM_API_URL}/getFile?file_id=${fileId}`);
        const filePath = filePathResponse.data.result.file_path;
        return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
};

// Endpoint to handle messages from Telegram
app.post('/api/getMessages', async (req, res) => {
    try {
        const message =
            req.body.message ||
            req.body.edited_message ||
            req.body.channel_post ||
            req.body.edited_channel_post;

        if (message) {
            const { caption, photo, message_id, media_group_id } = message;
            let item = items.find((item) => item.media_group_id === media_group_id);

            if (caption) {
                const lines = caption.split('\n').map((line) => line.trim());
                const name = lines[0] || '';
                const description = lines[1] || '';
                const price = lines[2] || '';
                const specs = lines.slice(3).join('\n');

                if (caption.includes('DELETE')) {
                    items = items.filter((item) => item.media_group_id !== media_group_id);
                    return res.send('Item deleted');
                }

                if (!item) {
                    item = {
                        id: nextItemId++,
                        message_id,
                        media_group_id,
                        name,
                        description,
                        price,
                        specs,
                        imageUrls: [],
                    };
                    items.push(item);
                } else {
                    item.name = name || item.name;
                    item.description = description || item.description;
                    item.price = price || item.price;
                    item.specs = specs || item.specs;
                }
            }

            if (photo) {
                const largestPhoto = photo[photo.length - 1];
                const imageUrl = await getFileUrl(largestPhoto.file_id);
                if (imageUrl) {
                    if (!item) {
                        item = {
                            id: nextItemId++,
                            message_id,
                            media_group_id,
                            imageUrls: [imageUrl],
                        };
                        items.push(item);
                    } else if (!item.imageUrls.includes(imageUrl)) {
                        item.imageUrls.push(imageUrl);
                    }
                }
            }
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error processing the message:', error);
        res.sendStatus(500);
    }
});

// Endpoint to retrieve all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Endpoint to send messages to Telegram
app.get('/api/send', async (req, res) => {
    try {
        const messageText = 'Text from the backend';
        const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: CHAT_ID,
            text: messageText,
        });
        console.log('Message sent:', response.data);
        res.send('Message sent to Telegram');
    } catch (error) {
        console.error('Error sending message to Telegram:', error.response?.data || error.message);
        res.status(500).send('Failed to send message');
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Telegram API');
});

// Set webhook
const setWebhook = async () => {
    try {
        const webhookUrl = `https://fetch-tele-data.vercel.app/api/getMessages`;
        const response = await axios.post(`${TELEGRAM_API_URL}/setWebhook`, {
            url: webhookUrl,
        });
        console.log('Webhook set:', response.data);
    } catch (error) {
        console.error('Error setting webhook:', error.response ? error.response.data : error.message);
    }
};

setWebhook();

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
