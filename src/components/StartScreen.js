import React from 'react';
import '../styles/StartScreen.css';

const StartScreen = () => {
  return (
    <div className="startScreenContainer">
      <h1 className="startScreenTitle">GAME TITLE</h1>
      <button 
        className="startScreenButton" 
        onClick={handleStartGame}
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;