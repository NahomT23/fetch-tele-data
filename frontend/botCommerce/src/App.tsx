// import axios from 'axios';
// import { useEffect, useState } from 'react';

// function App() {
//     const [text, setText] = useState(''); // State to store the latest message

//     // Fetch the latest message from the backend
//     const getLatestMessage = () => {
//         axios.get('https://fetch-tele-data.vercel.app/api/latestMessage')
//             .then(response => {
//                 setText(response.data.message || 'No messages received yet');
//             })
//             .catch(error => {
//                 console.error('Error fetching the latest message:', error);
//             });
//     };

//     // Send a hardcoded message to Telegram
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
//         const interval = setInterval(getLatestMessage, 5000); // Poll every 5 seconds
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



import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [text, setText] = useState(''); // State to store the latest message

    // Fetch the latest message from the backend
    const getLatestMessage = () => {
        axios.get('https://fetch-tele-data.vercel.app/api/latestMessage')
            .then(response => {
                setText(response.data.message || 'No messages received yet');
            })
            .catch(error => {
                console.error('Error fetching the latest message:', error);
            });
    };

    // Send a hardcoded message to Telegram
    const sendMessage = () => {
        axios.get('https://fetch-tele-data.vercel.app/api/send')
            .then(() => {
                alert('Message sent to Telegram');
            })
            .catch(error => {
                console.error('Error sending message to Telegram:', error);
            });
    };

    useEffect(() => {
        getLatestMessage();
        const interval = setInterval(getLatestMessage, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <p className="mb-4 text-lg font-semibold">Latest Message:</p>
                <p className="mb-8 text-gray-700">{text}</p>
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Send message to Telegram
                </button>
            </div>
        </div>
    );
}

export default App;



