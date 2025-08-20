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
import { RoundsProvider } from './context/Rounds';
import Badge from './Badge';  
function App() {
  const [currentView, setCurrentView] = useState('startScreen');
  

  // Debug useEffect
  useEffect(() => {
    console.log('Current view changed to:', currentView);
  }, [currentView]);

  // Create all handler functions at the top level
  const handleContinue = () => {
    console.log('Continuing to avatar');
    setCurrentView('avatar');
  };

  const handleAvatarContinue = () => {
    console.log('Continuing to swipe');
    setCurrentView('swipe');
  };

  const handleEnterTexting = () => {
    console.log('Entering texting');
    setCurrentView('texting');
  };

  const handleEnterQuiz = () => {
    console.log('Entering quiz');
    setCurrentView('quiz');
  };

  const handleQuizBack = () => {
    console.log('Going to badge');
    setCurrentView('badge');
  };

  const handleRestart = () => {
    console.log('Restarting - setting view to avatar');
    setCurrentView('avatar');
  };

  return (
    <AvatarProvider>
      <CharacterProvider>
        <PointsProvider>
          <RoundsProvider>
            <div className="app">
              {currentView === 'startScreen' && (
                <StartScreen onEnterAvatar={handleContinue} />
              )}

              {currentView === 'avatar' && (
                <Avatar onEnterSwipe={handleAvatarContinue} />
              )}
              
              {currentView === 'swipe' && (
                <Swipe onEnterTexting={handleEnterTexting} />
              )}

              {currentView === 'texting' && (
                <Texting onEnterQuiz={handleEnterQuiz} />
              )}

              {currentView === 'quiz' && (
                <Quiz onEnterBadge={handleQuizBack} />
              )}

              {currentView === 'badge' && (
                <Badge onEnterRestart={handleRestart} />
              )}
            </div>
            <PointsDisplay />
          </RoundsProvider>
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