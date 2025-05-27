import "../styles/Avatar.css";
import React, {useState} from "react";



function Avatar (){
    const[avatarState, setAvatarState]= useState({
        shirts: {current: 0, total: 3}
    })

    function next(item){
        let nextNum = avatarState[item].current + 1;
        let newCurrent = nextNum < avatarState[item].total ? nextNum: 0;
        setAvatarState({
            ...avatarState,
            [item]:{
                current: avatarState[item].current=newCurrent,
                total: avatarState[item].total
            }
        })
    }


    return (
        <div id="avatarContainer">
            <div id="background">
                <div id="base"></div>
                <div id="shirt" className={"shirt"+(avatarState["shirts"].current+1)}></div>
            </div>
            <input type="button" value="next shirt" id="nextshirt" onClick={() => next("shirts")}/>
        </div>
    );
}

export default Avatar;