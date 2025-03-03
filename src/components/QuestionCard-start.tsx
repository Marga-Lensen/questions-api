// import React, { useState } from "react";
import '../styles/Card.scss'
// import './QuestionCard.scss'

interface Question {
  _id: string;
  question: string;
  answer: string;
  difficulty: number;
  categories: string[];
  toBeDeleted?: boolean;
}

interface CardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onVisited: () => void;
  visited: boolean;
  correctAnswer: boolean | null;
}

const QuestionCard: React.FC<CardProps> = ({
  question,
  onAnswer,
  onVisited,
  visited,
  correctAnswer,
}) => {
  const handleClick = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    onVisited();
  };

  // Card class logic for styling based on visited or correct answer
  const cardClass =
    visited
      ? "card visited"
      : correctAnswer === true
      ? "card correct"
      : correctAnswer === false
      ? "card incorrect"
      : "card";

  return (
    <div className={cardClass}>
      <div className="card-inner">
        <div className="card-front">
          <div>
            {/* Displaying the question text */}
            <h2>{question.question}</h2>
            
            {/* Displaying the difficulty and categories */}
            <p>{question.difficulty} | {question.categories.join(", ")}</p>
          </div>
        </div>
        <div className="card-back">
          <div>
            {/* Displaying the answer */}
            <p>{question.answer}</p>
            <button onClick={() => handleClick(true)}>Correct</button>
            <button onClick={() => handleClick(false)}>Incorrect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
