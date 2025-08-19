// context/SwipeCharacter.js
import React, { createContext, useState } from 'react';

export const SwipeCharacter = createContext();

export const CharacterProvider = ({ children }) => {
    const [character, setCharacter] = useState({
        image: "/images/cards/steve.png"
    });

    return (
        <SwipeCharacter.Provider value={{ character, setCharacter }}>
            {children}
        </SwipeCharacter.Provider>
    );
};