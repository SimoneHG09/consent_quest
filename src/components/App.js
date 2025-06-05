import React, { useState, useEffect } from 'react';
import { PointsProvider, usePoints } from './Points';
import Avatar from './Avatar';
import Swipe from './Swipe';
import Texting from './Texting';
import '../styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('avatar');

  return (
    <PointsProvider>
      <div className="app">
        {currentView === 'avatar' && (
          <Avatar onContinue={() => setCurrentView('swipe')} />
        )}
        
        {currentView === 'swipe' && (
          <Swipe 
            onEnterTexting={() => setCurrentView('texting')}
            onBack={() => setCurrentView('avatar')}
          />
        )}
        
        {currentView === 'texting' && (
          <Texting onBack={() => setCurrentView('swipe')} />
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