import "../styles/Avatar.css";
import React from "react";

function Avatar (){
    return (
        <div id="avatarContainer">
            <div id="background">
                <div id="base"></div>
                <div id="shirt" className="shirt1"></div>
            </div>
        </div>
    );
}

export default Avatar;