import React, { createContext, useState, useContext } from 'react';

export const RoundsContext = createContext();

export const RoundsProvider = ({ children }) => {
  const [rounds, setRounds] = useState(0);

const addRound = () => {
  console.log('addRound called, previous rounds:', rounds);
  setRounds(prev => {
    console.log('Setting rounds to:', prev + 1);
    return prev + 1;
  });
};
  const resetRounds = () => {
    setRounds(0);
  };

  return (
    <RoundsContext.Provider value={{ rounds, addRound, resetRounds }}>
      {children}
    </RoundsContext.Provider>
  );
};

// Create and export the custom hook
export const useRounds = () => {
  const context = useContext(RoundsContext);
  if (!context) {
    throw new Error('useRounds must be used within a RoundsProvider');
  }
  return context;
};