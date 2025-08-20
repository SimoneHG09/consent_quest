import "../styles/Avatar.css";
import React, { useState, useContext } from "react";
import Frame from './Frame.js';
import { AvatarContext } from './context/AvatarContext.js';
import { usePoints } from './context/Points';

function Avatar({ onEnterSwipe }) {
    const { avatar, setAvatar } = useContext(AvatarContext);
    const {resetPoints} = usePoints();

    resetPoints();

    function next(item) {
        setAvatar(prevState => {
            const nextNum = prevState[item].current + 1;
            const newCurrent = nextNum < prevState[item].total ? nextNum : 0;
            return {
                ...prevState,
                [item]: {
                    current: newCurrent,
                    total: prevState[item].total
                }
            };
        });
    }

    function last(item) {
        setAvatar(prevState => {
            const lastNum = prevState[item].current - 1;
            const newCurrent = lastNum >= 0 ? lastNum : prevState[item].total - 1;
            return {
                ...prevState,
                [item]: {
                    current: newCurrent,
                    total: prevState[item].total
                }
            };
        });
    }

    return (
        <div className="avatarContainer">
            <div className="arrowContainer">
                <Frame>
                    <div className="screenTitle">Choose your Character</div>
                    <div className="faceContainer">
                        <div id="base" className={`base${avatar.faces.current}`}></div>
                        <div id="shirt" className={`shirt${avatar.shirts.current}`}></div>
                        <div id="hair" className={`hair${avatar.hair.current}`}></div>
                    </div>
                </Frame>
                <button className="nextScreen" onClick={onEnterSwipe}>Continue</button>
                <button 
                    className="arrowButton hairLeft" 
                    onClick={() => last("hair")}
                ></button>
                <button 
                    className="arrowButton hairRight" 
                    onClick={() => next("hair")}
                ></button>
                <button 
                    className="arrowButton facesLeft" 
                    onClick={() => last("faces")}
                ></button>
                <button 
                    className="arrowButton facesRight" 
                    onClick={() => next("faces")}
                ></button>
                <button 
                    className="arrowButton shirtsLeft" 
                    onClick={() => last("shirts")}
                ></button>
                <button 
                    className="arrowButton shirtsRight" 
                    onClick={() => next("shirts")}
                ></button>
            </div>
        </div>
    );
}

export default Avatar;