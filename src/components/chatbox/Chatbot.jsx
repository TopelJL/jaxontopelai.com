import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Scroll to the bottom of the chatbox on each update
    const chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    if (userInput.trim() === '') return;

    const userMessage = userInput.trim();
    setUserInput('');

    // Add user message to the chat log
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'user' }]);

    try {
      // Send user message to the server for processing
      const response = await axios.post('/api/chat', { message: userMessage });

      // Add bot response to the chat log
      const botResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Oops! Something went wrong.', sender: 'bot' },
      ]);
    }
  };

  return (
    <div className="chatbox-container">
      <div id="chatbox" className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input-container">
        <input
          type="text"
          className="user-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleInputChange}
        />
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
