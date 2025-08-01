import '../styles/StartScreen.css';

function StartScreen({onContinue}) {
  return (
    <div className="startScreenContainer">
      <h1 className="startScreenTitle">Instructions</h1>
      <div className="textContainer">
        <p className="text"> 
          <b>Thank you for participating.</b>
          <p> You will be playing a demo version of a serious game, a game designed to be educational while still offering an engaging and enjoyable experience. </p> 
          <p> This particular game simulates scenarios within a dating app environment. As you make decisions, try to adopt the mindset of someone using such an app. </p> 
          <p> Throughout the game, we ask that you think aloud by verbalizing your thoughts, choices, and reactions. For example, you might explain why you selected a certain option or comment on aspects of the game's design and content. </p> 
          <p> Please note that your screen and audio will be recorded for research purposes. There are no right or wrong choices, simply interact with the game naturally and have fun. </p>
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