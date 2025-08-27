import '../styles/StartScreen.css';

function StartScreen({onEnterAvatar}) {
  return (
    <div className="startScreenContainer">
      <h1 className="startScreenTitle">Instructions</h1>
      <div className="textContainer">
        <text className="text"> 
          <b>Thank you for participating!</b>
          <p>You will play a demo version of a serious game, a type of game designed to be educational while offering an engaging and enjoyable experience.</p>
          <p>This particular game simulates scenarios within a dating app environment. As you make decisions, try to adopt the mindset of someone using such an app. You have three tries, so after one serious attempt, feel free to experiment! </p>
          <p>Throughout the game, we ask that you think aloud by verbalizing your thoughts, choices, and reactions. For example, you might explain why you selected a certain option or comment on the design or content of the game. This can happen in English or German.</p>
        <p>Please note that your screen and audio will be recorded for research purposes. There are no right or wrong choices; simply interact with the game naturally and have fun!</p>
        </text>
      </div>

      <button 
        className="startScreenButton" 
        onClick={onEnterAvatar}
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;