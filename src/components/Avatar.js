import "../styles/Avatar.css";
import React, { useState } from "react";

function Avatar({onContinue}) {
    const [avatarState, setAvatarState] = useState({
        shirts: { current: 0, total: 3 }
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

    return (
        <div className="avatarContainer">
            <div className="phone-container">
                <img src="/images/cards/phone.png" alt="Phone frame" className="phone-frame" />
                <div className="screen">
                    <div className="face-container">
                        <div id="base"></div>
                        <div id="shirt" className={`shirt${avatarState.shirts.current + 1}`}></div>
                    </div>
                    
                </div>
            </div>
            <button id="nextScreen" onClick={onContinue}>Continue</button>
            <button 
                className="arrow-button" 
                onClick={() => next("shirts")}
                aria-label="Next shirt"
            ></button>
        </div>
    );
}

export default Avatar;