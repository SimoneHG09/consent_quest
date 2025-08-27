import React, { useState, useEffect, useContext } from 'react';
import Confetti from 'react-confetti';
import '../styles/Badge.css';
import { usePoints } from './context/Points.js';
import { AvatarContext } from './context/AvatarContext.js';
import { useRounds } from './context/Rounds.js';    

function Badge({onEnterRestart}) {
  const { points } = usePoints();
  const [badge, setBadge] = useState("White");
  const {avatar}=useContext(AvatarContext);
  const {rounds} = useRounds();
  const [showSwipe, setShowSwipe]=useState(false);

  // Handle badge level
  useEffect(() => {
    let newBadge = "White";

    if (points > 95) {
      newBadge = "Rainbow";
    } else if (points > 70) {
      newBadge = "Gold";
    } else if (points > 45) {
      newBadge = "Silver";
    } else if (points > 20) {
      newBadge = "Bronze";
    }
     if(rounds<3){
      setShowSwipe(true);
  }

    setBadge(newBadge);
  }, [points, rounds]); 

 
  const drawSquare = (ctx) => {
    ctx.fillRect(-5, -5, 10, 10);
  };

  return (
    <div className="badge-screen">
     
      <Confetti
        numberOfPieces={1000}
        colors={['#FC7753', '#9590A8', '#DBD56E', '#92E2DE', '#403D58']}
        gravity={0.15}
        recycle={false}
        drawShape={drawSquare}
      />
      
      <div className="badgeContainer">
        <img 
          src={`/images/badges/badge${badge}.png`}
          alt={`${badge} Badge`}
          className="badge-image"
        />
        <div className='avatarBadge'>
        <img className='avatarBadge face' src={`/images/avatar/faces/face${avatar.faces.current}.png`}/>
        <img className='avatarBadge hair' src={`/images/avatar/hair/hair${avatar.hair.current}.png`}/>
        <img className='avatarBadge shirts' src={`/images/avatar/shirts/shirt${avatar.shirts.current}.png`}/>
        </div>
        You have {points}/100 points! <br/>
        You played {rounds}/3 rounds. <br/>
        Use the next tries to experiement with the interface a bit.
      {showSwipe && <button className='restartButton' onClick={onEnterRestart}> Restart </button>}
      {!showSwipe&&<p>You used your tries</p>}
      </div>
    </div>
  );
}

export default Badge;