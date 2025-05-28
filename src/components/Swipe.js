import React, { useState, useEffect } from 'react';
import '../styles/Swipe.css'; // We'll create this CSS file next

const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [swipedRight, setSwipedRight] = useState(false);
  
  // Sample data for your images and text
  const cards = [
    { 
      id: 1, 
      image: "/images/cards/swipe_1.png",
      text: 'First Card Text' 
    },
    { 
      id: 2, 
      image: 'image2.jpg', 
      text: 'Second Card Text' 
    },
    { 
      id: 3, 
      image: 'image3.jpg', 
      text: 'Third Card Text' 
    },
  ];

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        // Swipe right
        setPosition(500); // Move off to the right
        setTimeout(() => {
          setSwipedRight(true);
          // Move to next card or loop
          setCurrentIndex((prev) => (prev + 1) % cards.length);
          setPosition(0); // Reset position for next card
        }, 300);
      } else if (e.key === 'ArrowLeft') {
        // Swipe left
        setPosition(-500); // Move off to the left
        setTimeout(() => {
          // Move to previous card or loop
          setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
          setPosition(0); // Reset position for next card
        }, 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, swipedRight, cards.length]);

  const handleReturn = () => {
    setSwipedRight(false);
  };

  if (swipedRight) {
    return <RightComponent onReturn={handleReturn} />;
  }

  return (
    <div className="swipe-game-container">
      <div className="frame">
        <div 
          className="card" 
          style={{ transform: `translateX(${position}px)` }}
        >
          <img 
            src={cards[currentIndex].image} 
            alt={`Card ${currentIndex + 1}`} 
            className="card-image"
          />
          <div className="card-text">{cards[currentIndex].text}</div>
        </div>
      </div>
      <div className="instructions">
        Use ← and → arrow keys to swipe
      </div>
    </div>
  );
};

// The component that appears when swiping right
const RightComponent = ({ onReturn }) => {
  return (
    <div className="right-component">
      <h2>You swiped right!</h2>
      <p>This is the new component that appears.</p>
      <button onClick={onReturn}>Go Back</button>
    </div>
  );
};

export default Swipe;