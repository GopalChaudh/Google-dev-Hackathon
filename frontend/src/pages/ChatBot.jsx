import React, { useState } from 'react';
import './style.css';
import Message from '../components/Message';

export default function ChatBot() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const HandleClickSend = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`, // Use provided API key
                'model': 'gpt-3.5-turbo',
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 50 // Maximum length of the completion
            })
            
        };

        fetch('http://localhost:5000', requestOptions)
            .then(response => {
                console.log(response.json());
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const botResponse = data.choices[0].text.trim();
                setChatHistory(prevHistory => [...prevHistory, { userMessage: message, botMessage: botResponse }]);
                setMessage('');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                {/* Header section */}
            </div>
            <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {/* Display chat history */}
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <Message message={chat.userMessage} img="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" />
                        <Message message={chat.botMessage} img="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" />
                    </div>
                ))}
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    {/* Input field */}
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message!"
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                    />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button type="button" onClick={HandleClickSend} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-black bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <span className="font-bold">Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
