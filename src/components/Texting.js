import React, { useState, useEffect } from 'react';
import '../styles/Texting.css';
import {usePoints} from "./Points"
//import conversationData from '../data/conversation.json'; // Future JSON import

const Texting = ({ onBack }) => {
  const [conversation, setConversation] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const { points, addPoints } = usePoints();

  // Load initial conversation from JSON (future implementation)
  useEffect(() => {
    // For now, using hardcoded starter message
    setConversation([{
      id: 1, 
      text: "HEY THERE! READY TO CHAT?", 
      sender: 'them',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setCurrentOptions([
      { id: 1, text: "SURE!", next: "positiveResponse" },
      { id: 2, text: "NOT NOW", next: "negativeResponse" }
    ]);
  }, []);

  const handleSelectOption = (option) => {
    // Add user's response
    if (option.id === 1) addPoints(10); // Good answer
    if (option.id === 2) addPoints(5);  // Neutral answer
    setConversation(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: option.text,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Generate reply (will use JSON later)
    setTimeout(() => {
      const responses = {
        positiveResponse: {
          text: "AWESOME! WHAT'S NEW?",
          options: [
            { id: 3, text: "NOT MUCH", next: "neutral" },
            { id: 4, text: "LOTS TO SHARE!", next: "excited" }
          ]
        },
        negativeResponse: {
          text: "OKAY, CATCH YOU LATER!",
          options: []
        }
      };

      const response = responses[option.next];
      
      if (response) {
        setConversation(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: response.text,
            sender: 'them',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setCurrentOptions(response.options);
      }
    }, 800);
  };

  return (
    <div className="pixel-texting-screen">
      <div className="pixel-conversation-container">
        {/* Conversation Area */}
        <div className="pixel-conversation">
          {conversation.map((message) => (
            <div 
              key={message.id} 
              className={`pixel-message ${message.sender}`}
            >
              <div className="pixel-bubble">{message.text}</div>
              <div className="pixel-time">{message.time}</div>
            </div>
          ))}
        </div>

        {/* Options */}
        {currentOptions.length > 0 && (
          <div className="pixel-options-container">
            {currentOptions.map((option) => (
              <button
                key={option.id}
                className="pixel-option-button"
                onClick={() => handleSelectOption(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Texting;