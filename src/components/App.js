import React, { useState } from 'react';
import Swipe from './Swipe';
import Texting from './Texting';
import Avatar from './Avatar';
import '../styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('avatar'); // 'avatar' | 'swipe' | 'texting'

  return (
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
    </div>
  );
}

export default App;
