import React, { useState, useEffect } from 'react';
import '../styles/Texting.css';
import {usePoints} from "./Points"
import conversationData from '../desicions/scenario1.json'; // Future JSON import
import Quiz from "./Quiz"

const Texting = ({ onBack }) => {
  const [currentNodeId, setCurrentNodeId] = useState('opening');
  const [conversation, setConversation] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const { addPoints } = usePoints();
  const [showQuiz, setShowQuiz] = useState(false);

  // Initialize or update conversation when node changes
  useEffect(() => {
    const node = conversationData[currentNodeId];
    
    if (!node) {
      console.error(`Node ${currentNodeId} not found in conversation data`);
      return;
    }

      if (!node.options || node.options.length === 0) {
    setTimeout(() => setShowQuiz(true), 1000); 
  }

    // Add system message if conversation is empty
    if (conversation.length === 0) {
      setConversation([{
        id: 1,
        text: node.message,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }

    setCurrentOptions(node.options || []);
  }, [currentNodeId]);

  const handleSelectOption = (option) => {
    // Add user's message
    const userMessage = {
      id: conversation.length + 1,
      text: option.text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update points
    if (option.points) {
      addPoints(option.points);
    }

    // Update conversation
    setConversation(prev => [...prev, userMessage]);

    // Handle next node after delay
    setTimeout(() => {
      if (option.next) {
        const nextNode = conversationData[option.next];
        
        if (nextNode) {
          console.log("there is a next node");
          // Add system reply
          setConversation(prev => [
            ...prev,
            {
              id: prev.length + 2,
              text: nextNode.message,
              sender: 'them',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          
          setCurrentNodeId(option.next);
        } else {
          onBack(); // Exit if path is broken
        }
      } else {
       setShowQuiz(true);
      }
    }, 800);
  };

  if (showQuiz) {
    console.log("No next node; showing quiz");
    return <Quiz onBack={() => setShowQuiz(false)} />;
  }

  return (
    <div className="pixel-texting-screen">
      <div className="pixel-conversation-container">
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