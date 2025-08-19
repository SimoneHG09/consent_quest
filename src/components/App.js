import React, { useState, useEffect } from 'react';
import { PointsProvider, usePoints } from './context/Points';
import Avatar from './Avatar';
import Swipe from './Swipe';
import Texting from './Texting';
import StartScreen from "./StartScreen";
import Quiz from "./Quiz";
import '../styles/App.css';
import { AvatarProvider } from './context/AvatarContext';
import { CharacterProvider } from './context/SwipeCharacter';


function App() {
  const [currentView, setCurrentView] = useState('startScreen');

  return (
    <AvatarProvider>
    <CharacterProvider>
    <PointsProvider>
      <div className="app">
        {currentView === 'startScreen' && (
          <StartScreen onContinue={() => setCurrentView('avatar')} />
        )}

        {currentView === 'avatar' && (
          <Avatar onContinue={() => setCurrentView('swipe')} />
        )}
        
        {currentView === 'swipe' && (
          <>
          <Swipe
            onEnterTexting={() => setCurrentView('texting')}
          />
          </>
        )}

        {currentView === 'texting' && (
          <>
          <Texting
            onEnterDone={() => setCurrentView('quiz')}
          />
          </>
          )}

        {currentView === 'quiz' && (
          <>
          <Quiz
            onBack={() => setCurrentView('badge')}
          />
          </>
        )}
        
      </div>
      <PointsDisplay />
    </PointsProvider>
    </CharacterProvider>
    </AvatarProvider>
  );
}

const PointsDisplay = () => {
  const { points } = usePoints();
  
  return (
    <div className="points-display">
      POINTS: {points}
    </div>
  );
};


export default App;