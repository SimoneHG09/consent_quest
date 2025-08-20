import React, { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import Frame from './Frame.js';
import Badge from "./Badge.js";
import {usePoints} from "./context/Points.js";
import quizData from "../desicions/quiz.json";
import { useRounds} from "./context/Rounds.js"

function Quiz({ onEnterBadge }) {
  const [currentQuestionId, setCurrentQuestionId] = useState('1'); 
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer]= useState(true);
  const [wrongAnswer, setWrongAnswer]= useState(true);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const { addPoints } = usePoints();
  const {addRound}= useRounds();

  useEffect(() => {
    const question = quizData[currentQuestionId];
    setCurrentQuestion(question);
    setCorrectAnswer(true);
    setWrongAnswer(true);
  }, [currentQuestionId]);

 const handleSwipe = (direction) => {
  setTransitionDirection(direction > 0 ? 'left' : 'right');

  setTimeout(() => {
    const isCorrect = 
      (direction < 0 && currentQuestion.correct === "y") || 
      (direction >= 0 && currentQuestion.correct === "n");

    if (isCorrect) {
      setWrongAnswer(false);
      addPoints(currentQuestion.points);
      setTimeout(goToNextQuestion, 5000);
    } else {
      setCorrectAnswer(false);
      setTimeout(goToNextQuestion, 5000);
    }
  }, 300);
};

const goToNextQuestion = () => {
  if (currentQuestion.next) {
    setCurrentQuestionId(currentQuestion.next);
  } else {
    addRound();
    onEnterBadge();
  }
  setTransitionDirection(null);
};
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleSwipe(-1); 
      } else if (e.key === 'ArrowLeft') {
        handleSwipe(1); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion]); 
  

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

return (
  <div className="swipeContainerQuiz">
    <Frame>
      <div className={`card ${transitionDirection ? `slide-${transitionDirection}` : ''}`}>
        <div className="question">{currentQuestion.text}</div>
        <div className="buttonContainer">
          <button 
            className="swipeButton crossButton"
            onClick={() => handleSwipe(1)}
          >
            <img className="cross" src='/images/cards/cross.png' alt="No"/>
          </button>
          <button 
            className="swipeButton heartButton"
            onClick={() => handleSwipe(-1)}
          >
            <img className="heart" src='/images/cards/heart.png' alt="Yes"/>
          </button>
        </div>
      </div>
      {!correctAnswer && (
        <div className="backgroundExp">
          <div className="explanation">{currentQuestion.explanation}</div>
        </div>
      )}
      {!wrongAnswer && (
        <div className="backgroundCor">
          <div className="explanation">{currentQuestion.explanation}</div>
        </div>
      )}
    </Frame>
    <div className="instructions">
      {currentQuestion.next 
        ? "Use the ← and → arrow keys or buttons to answer." 
        : "Last Question"}
    </div>
  </div>
);
};

export default Quiz;