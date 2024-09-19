import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatBox.css'; // Make sure to create this CSS file

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            Chat
            <button className="btn btn-danger btn-sm float-right" onClick={toggleChatBox}>
              X
            </button>
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong>{message.sender}: </strong>{message.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
      <button className="chat-toggle-btn" onClick={toggleChatBox}>
        <i className="fas fa-comments"></i>
      </button>
    </div>
  );
};

export default ChatBox;
