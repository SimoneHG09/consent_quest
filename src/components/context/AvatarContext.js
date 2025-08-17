import React, { createContext, useState } from 'react';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState({
        shirts: { current: 1, total: 11 },
        faces: { current: 1, total: 7 },
        hair: { current: 1, total: 19 }
    });

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};