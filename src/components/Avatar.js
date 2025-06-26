import "../styles/Avatar.css";
import React, { useState } from "react";
import Frame from './Frame.js';

function Avatar({onContinue}) {
    const [avatarState, setAvatarState] = useState({
        shirts: { current: 0, total: 10 },
        faces: {current: 0, total: 7},
        hair: {curren:0, total:19}
    });

    function next(item) {
        setAvatarState(prevState => {
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
        setAvatarState(prevState => {
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
                        <div id="base" className={`base${avatarState.faces.current + 1}`}></div>
                        <div id="shirt" className={`shirt${avatarState.shirts.current + 1}`}></div>
                        <div id="hair" className={`hair${avatarState.hair.current + 1}`}></div>
                    </div>
                </Frame>
                <button className="nextScreen" onClick={onContinue}>Continue</button>
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