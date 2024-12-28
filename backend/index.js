// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';
// import dotenv from 'dotenv';


// dotenv.config()

// const app = express();
// app.use(express.json());


// app.use(cors())

// const PORT = 5000;
// const BOT_TOKEN = process.env.BOT_TOKEN

// const myChatId = process.env.CHAT_ID

// const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// let latestMessage = ''; 

// app.post('/getMessages', async (req, res) => {
//     try {

//         const message = req.body?.message?.text; 
        
//         const chatId = req.body?.message?.chat?.id;
//         console.log('Chat ID:', chatId); 
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


// app.get('/send', async (req, res) => {
//     try {

//         const chatId = process.env.CHAT_ID
//         const messageText = 'Text from the backend';

//         console.log(myChatId)
//         const response = await axios.post(TELEGRAM_API_URL, {
//             chat_id: chatId,
//             text: messageText,
//         });

//         console.log('Message sent:', response.data);
//         res.send('Message sent to Telegram');
//     } catch (error) {
//         console.error('Error sending message to Telegram:', error.response?.data || error.message);
//         res.status(500).send('Failed to send message');
//     }
// });



// app.get('/latestMessage', (req, res) => {
//     res.json({ message: latestMessage });
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to the Telegram API');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

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

// app.post('/api/getMessages', async (req, res) => {
//     try {
//         const message = req.body?.message?.text;
//         const chatId = req.body?.message?.chat?.id;

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

// app.get('/api/latestMessage', (req, res) => {
//     res.json({ message: latestMessage });
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to the Telegram API');
// });

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

const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Store received messages
let latestMessage = '';

// Endpoint to handle incoming Telegram updates
app.post('/api/getMessages', async (req, res) => {
    try {
        const message = req.body?.message?.text;
        const chatId = req.body?.message?.chat?.id;

        if (message) {
            console.log(`User Message: ${message}`);
            latestMessage = message; // Update latest message
        } else {
            console.log('No text message received');
        }
        res.sendStatus(200); // Acknowledge Telegram API
    } catch (error) {
        console.error('Error processing the message:', error);
        res.sendStatus(500);
    }
});

// Endpoint to send a message to Telegram
app.get('/api/send', async (req, res) => {
    try {
        const messageText = 'Text from the backend';

        const response = await axios.post(TELEGRAM_API_URL, {
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

// Endpoint to retrieve the latest received message
app.get('/api/latestMessage', (req, res) => {
    res.json({ message: latestMessage });
});

// Test endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Telegram API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
