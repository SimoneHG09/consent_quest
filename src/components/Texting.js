import React, { useState, useEffect, useContext } from 'react';
import '../styles/Texting.css';
import { usePoints } from "./context/Points.js";
import conversationData from '../desicions/scenario1.json'; 
import Quiz from "./Quiz";
import { AvatarContext } from './context/AvatarContext.js';
import { SwipeCharacter } from './context/SwipeCharacter';

const Texting = ({ onEnterQuiz }) => {
  const [currentNodeId, setCurrentNodeId] = useState('opening');
  const [conversation, setConversation] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const { addPoints } = usePoints();
  const {avatar}=useContext(AvatarContext);
  const { character } = useContext(SwipeCharacter);

  useEffect(() => {
    const node = conversationData[currentNodeId];
    
    if (!node) {
      console.error(`Node ${currentNodeId} not found in conversation data`);
      return;
    }

    if (!node.options || node.options.length === 0) {
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Click to continue!",
            sender: 'them',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    }

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
    const userMessage = {
      id: conversation.length + 1,
      text: option.text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (option.points) {
      addPoints(option.points);
    }

    setConversation(prev => [...prev, userMessage]);

    setTimeout(() => {
      if (option.next) {
        const nextNode = conversationData[option.next];
        
        if (nextNode) {
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
          onEnterQuiz(); 
        }
      }
    }, 800);
  };

  const handleExclamationClick = () => {
    onEnterQuiz(); 
  };

  return (
    <div className="pixelTextingScreen">
       <div className="character-display">
      {character?.image && (
        <img 
          src={character.image} 
          alt={character.name || 'Character'} 
          className="character-image"
        />
      )}
    </div>
      <div className="pixelConversationContainer">
        <div className="pixelConversation">
          {conversation.map((message) => (
            <div 
              key={message.id} 
              className={`pixelMessage ${message.sender}`}
            >
              {message.text === "Click to continue!" ? (
                <button
                  className="pixelBubble changeScreenBubble"
                  onClick={handleExclamationClick}
                >
                  Click to continue!
                </button>
              ) : (
                <div className="pixelBubble">
                  {message.text}
                </div>
              )}
              <div className="pixelTime">{message.time}</div>
            </div>
          ))}
        <div className='avatar'>
        <img className='avatar face' src={`/images/avatar/faces/face${avatar.faces.current}.png`}/>
        <img className='avatar hair' src={`/images/avatar/hair/hair${avatar.hair.current}.png`}/>
        <img className='avatar shirts' src={`/images/avatar/shirts/shirt${avatar.shirts.current}.png`}/>
      </div>
        </div>

        {currentOptions.length > 0 && (
          <div className="pixelOptionsContainer">
            {currentOptions.map((option) => (
              <button
                key={option.id}
                className="pixelOptionButton"
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