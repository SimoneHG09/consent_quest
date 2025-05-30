import React, { useState, useEffect } from 'react';
import '../styles/Swipe.css';
import Texting from './Texting';

const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [showTexting, setShowTexting] = useState(false);
  
  const cards = [
    { 
      id: 1, 
      image: "/images/cards/swipe_1.png",
      text: 'First Card Text' 
    },
    { 
      id: 2, 
      image: "/images/cards/swipe_2.png", 
      text: 'Second Card Text' 
    },
    { 
      id: 3, 
      image: "/images/cards/swipe_3.png", 
      text: 'Swipe right to text →' // Indicate this is the texting trigger
    },
  ];

  const handleSwipe = (direction) => {
    setTransitionDirection(direction > 0 ? 'left' : 'right');
    
    setTimeout(() => {
      if (direction < 0) {
        setShowTexting(true);
      } else {
        // Normal swipe behavior
        setCurrentIndex((prev) => {
          const newIndex = prev + direction;
          if (newIndex < 0) return cards.length - 1;
          if (newIndex >= cards.length) return 0;
          return newIndex;
        });
      }
      setTransitionDirection(null);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleSwipe(-1); // Swipe right
      } else if (e.key === 'ArrowLeft') {
        handleSwipe(1); // Swipe left
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  if (showTexting) {
    return <Texting onBack={() => setShowTexting(false)} />;
  }

  return (
    <div className="swipeContainer">
      <div className="phone-container">
        <img src="/images/cards/phone.png" alt="Phone frame" className="phone-frame" />
        <div className="screen">
          <div className={`card ${transitionDirection ? `slide-${transitionDirection}` : ''}`}>
            <img 
              src={cards[currentIndex].image} 
              alt={`Card ${currentIndex + 1}`} 
              className="card-image"
            />
            <div className="card-text">{cards[currentIndex].text}</div>
          </div>
        </div>
      </div>
      <div className="instructions">
        {currentIndex === cards.length - 1 
          ? "Swipe right to start texting" 
          : "Use ← and → arrow keys to swipe"}
      </div>
    </div>
  );
};

export default Swipe;