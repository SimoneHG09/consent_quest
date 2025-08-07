import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/Badge.css';
import { usePoints } from './Points';

function Badge() {
  const { points } = usePoints();
  const [badge, setBadge] = useState("White");
  const [text, setText] = useState("Maybe try again...");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [runConfetti, setRunConfetti] = useState(true);

  // Handle badge level
  useEffect(() => {
    console.log(points);
    let newBadge = "White";
    let newText = "Maybe try again..."

    if (points > 95) {
      newBadge = "Rainbow";
      newText = "Your an expert at this"
    } else if (points > 90) {
      newBadge = "Gold";
    } else if (points > 50) {
      newBadge = "Silver";
    } else if (points > 20) {
      newBadge = "Bronze";
    }
    
    setBadge(newBadge);
  }, [points]); // Only run when points change


  const drawSquare = (ctx) => {
    ctx.fillRect(-5, -5, 10, 10);
  };

  return (
    <div className="badge-screen">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={1000}
        colors={['#FC7753', '#9590A8', '#DBD56E', '#92E2DE', '#403D58']}
        gravity={0.15}
        recycle={false}
        drawShape={drawSquare}
      />
      
      <div className="badge-container">
        <img 
          src={`/images/badges/badge${badge}.png`}
          alt={`${badge} Badge`}
          className="badge-image"
        />
      </div>
    </div>
  );
}

export default Badge;