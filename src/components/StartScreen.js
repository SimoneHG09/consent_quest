import React from 'react';
import '../styles/StartScreen.css';

function StartScreen({onContinue}) {
  return (
    <div className="startScreenContainer">
      <h1 className="startScreenTitle">Instructions</h1>
      <div className='tDiv'>
      <p className="text">You will be presented with a demo version of a game. <br/>
        The screen and audio will be recorded, <br/> so please voice any and all thoughts out loud to help improve the game.<br/>
        There is no right or wrong way to play.<br/> Just engage naturally and have fun!
      </p>
      </div>

      <button 
        className="startScreenButton" 
        onClick={onContinue}
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;