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
