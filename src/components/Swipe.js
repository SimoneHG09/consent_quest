import React, { useState, useEffect, useContext } from 'react';
import '../styles/Swipe.css';
import Texting from './Texting';
import Frame from './Frame';
import { SwipeCharacter } from './context/SwipeCharacter';

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [showTexting, setShowTexting] = useState(false);
  const { character, setCharacter } = useContext(SwipeCharacter);

  const cards = [
    { id: 1, image: "/images/cards/steve.png", text: 'Steve, 28' },
    { id: 2, image: "/images/cards/bob.png", text: 'Bob, 20' }
  ];

const handleSwipe = (direction) => {
    setTransitionDirection(direction > 0 ? 'left' : 'right');
    
    setTimeout(() => {
      if (direction < 0) { 
        setShowTexting(true);
        const currentCard = cards[currentIndex];
        setCharacter({
        image: currentCard.image,
        name: currentCard.text.split(',')[0].trim()
      });
      } else { 
        setCurrentIndex(prev => {
          const newIndex = (prev + 1) % cards.length;
          return newIndex;
        });
      }
      setTransitionDirection(null);
    }, 300);
  };
 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleSwipe(-1);
      if (e.key === 'ArrowLeft') handleSwipe(1); 
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
          <div className="cardOverlay">
            <div className="buttonContainer">
              <button 
                className="swipeButton crossButton"
                onClick={() => handleSwipe(1)}
              >
                <img className="cross" src='/images/cards/cross.png' alt="Reject" />
              </button>
              <div className="cardText">{cards[currentIndex].text}</div>
              <button 
                className="swipeButton heartButton"
                onClick={() => handleSwipe(-1)}
              >
                <img className="heart" src='/images/cards/heart.png' alt="Like" />
              </button>
            </div>
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