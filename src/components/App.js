import React, { useState, useEffect } from 'react';
import { PointsProvider, usePoints } from './Points';
import Avatar from './Avatar';
import Swipe from './Swipe';
import Texting from './Texting';
import StartScreen from "./StartScreen";
import Quiz from "./Quiz";
import '../styles/App.css';



function App() {
  const [currentView, setCurrentView] = useState('startScreen');

  return (
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
        <PointsDisplay />
      </div>
    </PointsProvider>
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