import React, { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import Frame from './Frame.js';
import Avatar from './Avatar.js';

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [showRestart, setShowRestart] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

      const questions = [
    { 
      id: 1, 
      text: 'Steve, 28',
      correct: "n"
    },
    { 
      id: 2, 
      text: 'Bob, 20' , 
      correct: "y"
    }
  ];

  const handleSwipe = (direction) => {
    setTransitionDirection(direction > 0 ? 'left' : 'right');
    
    setTimeout(() => {
      if (direction < 0) {
        if(questions[currentIndex].correct="n"){

        }
      } else {
         if(questions[currentIndex].correct="y"){

        }
    }
    setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex >= cards.length && turn>=2) setShowRestart(true);
        if (newIndex >= cards.length && turn < 2) setShowBadges(true);
        return newIndex;
    });
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

  if (cards.length === 0) {
    return <div>No cards available</div>;
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
            <div className='textAlign'>
               <img
              src='/images/cards/cross.png'
              className='cardCross'
              />
            <div className="cardText">{cards[currentIndex].text}</div>
              <img
              src='/images/cards/heart.png'
              className='cardHeart'
              />
            </div>
            
          </div>
      </Frame>
      <div className="instructions">
        {currentIndex === cards.length - 1 
          ? "Swipe right to start texting" 
          : "Use ← and → arrow keys to swipe"}
      </div>
    </div>
  );
};

export default Swipe;