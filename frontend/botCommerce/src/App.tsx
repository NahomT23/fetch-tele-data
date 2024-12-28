// import axios from 'axios';
// import { useEffect, useState } from 'react';

// function App() {
//     const [text, setText] = useState('');
    
//     const getLatestMessage = () => {
    
//         axios.get('https://fetch-tele-data.vercel.app/api/latestMessage')
//             .then(response => {
//                 setText(response.data.message || 'No messages received yet');
//             })
//             .catch(error => {
//                 console.error('Error fetching the latest message:', error);
//             });
//     };


//     const sendMessage = () => {
//         axios.get('https://fetch-tele-data.vercel.app/api/send')
//             .then(() => {
//                 alert('Message sent to Telegram');
//             })
//             .catch(error => {
//                 console.error('Error sending message to Telegram:', error);
//             });
//     };


//     useEffect(() => {
//         getLatestMessage();
//         const interval = setInterval(getLatestMessage, 5000); 
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="grid items-center justify-center min-h-screen bg-gray-100">
//             <div className="text-center">
//                 <p className="mb-4 text-lg font-semibold">Latest Message:</p>
//                 <p className="mb-8 text-gray-700">{text}</p>
//                 <button
//                     onClick={sendMessage}
//                     className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
//                 >
//                     Send message to Telegram
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default App;


import axios from "axios";
import { useEffect, useState } from "react";

// Define the type for an item
interface Item {
    id: number;
    name: string;
    description: string;
    price: string;
    specs: string;
    imageUrls: string[];
}

function App() {
    const [items, setItems] = useState<Item[]>([]);

    // Fetch items from the backend
    const fetchItems = async () => {
        try {
            const response = await axios.get("https://fetch-tele-data.vercel.app/api/items");
            setItems(response.data.items || []); // Ensure response has `items` array
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.get("https://fetch-tele-data.vercel.app/api/send");
            alert("Message sent to Telegram");
        } catch (error) {
            console.error("Error sending message to Telegram:", error);
        }
    };

    useEffect(() => {
        fetchItems();
        const interval = setInterval(fetchItems, 5000); // Update every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="mb-6 text-2xl font-bold text-center">
                    Items from Telegram
                </h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 bg-white border rounded shadow"
                        >
                            <div className="mb-4">
                                <div className="relative w-full h-48 bg-gray-200">
                                    {item.imageUrls && item.imageUrls.length > 0 ? (
                                        <img
                                            src={item.imageUrls[0]}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <p className="text-center text-gray-500">
                                            No image available
                                        </p>
                                    )}
                                </div>
                            </div>
                            <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
                            <p className="mb-2 text-gray-700">{item.description}</p>
                            <p className="mb-2 text-gray-900 font-bold">${item.price}</p>
                            <p className="mb-4 text-sm text-gray-600">{item.specs}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Send Message to Telegram
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
