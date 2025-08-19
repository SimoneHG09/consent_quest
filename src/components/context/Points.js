import React, { createContext, useState, useContext } from 'react';

const Points = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const resetPoints = () => {
    setPoints(0);
  };

  

  return (
    <Points.Provider value={{ points, addPoints, resetPoints }}>
      {children}
    </Points.Provider>
  );
};

export const usePoints = () => {
  return useContext(Points);
};