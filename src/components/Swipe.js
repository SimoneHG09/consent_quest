import React, { useState, useEffect } from 'react';
import '../styles/Swipe.css';
import Texting from './Texting';
import Frame from './Frame';

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [showTexting, setShowTexting] = useState(false);

  const cards = [
    { id: 1, image: "/images/cards/card1.png", text: 'Steve, 28' },
    { id: 2, image: "/images/cards/card2.png", text: 'Bob, 20' }
  ];

  const handleSwipe = (direction) => {
    setTransitionDirection(direction > 0 ? 'left' : 'right');
    
    setTimeout(() => {
      if (direction < 0) { // Right swipe (× button or right arrow)
        setShowTexting(true);
      } else { // Left swipe (♥ button or left arrow)
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }
      setTransitionDirection(null);
    }, 300);
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleSwipe(-1); // Right arrow = right swipe
      if (e.key === 'ArrowLeft') handleSwipe(1); // Left arrow = left swipe
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (showTexting) {
    return <Texting onBack={() => setShowTexting(false)} />;
  }

  return (
    <div className="swipeContainer">
      <Frame>
        <div className={`card ${transitionDirection ? `slide-${transitionDirection}` : ''}`}>
          <img 
            src={cards[currentIndex].image} 
            alt={`Card ${currentIndex + 1}`} 
            className="card-image"
          />
          <div className="buttonContainer">
            <button 
              className="swipeButton crossButton"
              onClick={() => handleSwipe(1)}
            >
              <img className="cross" src='/images/cards/cross.png'></img>
            </button>
            <div className="cardText">{cards[currentIndex].text}</div>
            <button 
              className="swipeButton heartButton"
              onClick={() => handleSwipe(-1)}
            >
              <img className="heart" src='/images/cards/heart.png'></img>
            </button>
          </div>
        </div>
      </Frame>
      <div className="instructions">
        {currentIndex === cards.length - 1 
          ? "Press → or click × to start texting" 
          : "Press ← or click ♥ to see next profile"}
      </div>
    </div>
  );
}

export default Swipe;