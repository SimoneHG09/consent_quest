import React, { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import Frame from './Frame.js';
import Badge from "./Badge.js";
import {usePoints} from "./Points";
import quizData from "../desicions/quiz.json";

function Quiz({ onBack }) {
  const [currentQuestionId, setCurrentQuestionId] = useState('1'); 
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer]= useState(true);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [showBadges, setShowBadges] = useState(false);
  const { addPoints } = usePoints();

  useEffect(() => {
    const question = quizData[currentQuestionId];
    
    if (!question) {
      console.error(`Question ${currentQuestionId} not found`);
      setShowBadges(true);
      return;
    }

    setCurrentQuestion(question);
    setCorrectAnswer(true);
  }, [currentQuestionId]);

 const handleSwipe = (direction) => {
  setTransitionDirection(direction > 0 ? 'left' : 'right');

  setTimeout(() => {
    const isCorrect = 
      (direction < 0 && currentQuestion.correct === "y") || 
      (direction >= 0 && currentQuestion.correct === "n");

    if (isCorrect) {
      addPoints(currentQuestion.points);
      // Move to next question immediately if correct
      goToNextQuestion();
    } else {
      setCorrectAnswer(false);
      // Show explanation for 2 seconds, then move to next question
      setTimeout(goToNextQuestion, 5000);
    }
  }, 300);
};

// Helper function to handle question transition
const goToNextQuestion = () => {
  if (currentQuestion.next) {
    setCurrentQuestionId(currentQuestion.next);
  } else {
    setShowBadges(true);
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
  
  if (showBadges) {
    return <Badge onBack={onBack} />;
  }

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

// ... (keep all your existing imports and hooks)

return (
  <div className="swipeContainer">
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
    </Frame>
    <div className="instructions">
      {currentQuestion.next 
        ? "Use ← and → arrow keys to answer" 
        : "Last Question"}
    </div>
  </div>
);
};

export default Quiz;