import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config()

const app = express();
app.use(express.json());

// app.use(cors({ origin: '*' })); // Replace '*' with your frontend URL for stricter security

app.use(cors())

const PORT = 5000;
const BOT_TOKEN = process.env.BOT_TOKEN

const myChatId = process.env.BOT_TOKEN

const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

let latestMessage = ''; 

app.post('/getMessages', async (req, res) => {
    try {

        const message = req.body?.message?.text; 
        
        const chatId = req.body?.message?.chat?.id;
        console.log('Chat ID:', chatId); 
        if (message) {
            console.log(`User Message: ${message}`); 
            latestMessage = message;
        } else {
            console.log('No text message received'); 
        }
        res.sendStatus(200); 
    } catch (error) {
        console.error('Error processing the message:', error); 
        res.sendStatus(500);
    }
});


app.get('/send', async (req, res) => {
    try {

        const chatId = process.env.CHAT_ID
        const messageText = 'Text from the backend';

        console.log(myChatId)
        const response = await axios.post(TELEGRAM_API_URL, {
            chat_id: chatId,
            text: messageText,
        });

        console.log('Message sent:', response.data);
        res.send('Message sent to Telegram');
    } catch (error) {
        console.error('Error sending message to Telegram:', error.response?.data || error.message);
        res.status(500).send('Failed to send message');
    }
});



app.get('/latestMessage', (req, res) => {
    res.json({ message: latestMessage });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Telegram API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

