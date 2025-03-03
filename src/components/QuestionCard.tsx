import React, { useState } from "react";
// import '../styles/QuestionCard.scss'
import '../styles/Card.scss'

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
  /* onAnswer: (isCorrect: boolean) => void;
  onVisited: () => void;
  visited: boolean;
  correctAnswer: boolean | null; */
}

const QuestionCard: React.FC<CardProps> = ({
  question,
  /* onAnswer,
  onVisited,
  visited,
  correctAnswer, */
}) => {
  const [flipped, setFlipped] = useState(false);  // new for flipping

  /* const handleClick = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    onVisited();
  }; */

  // Card class logic for styling based on visited or correct answer
  /* const cardClass =
    visited
      ? "card visited"
      : correctAnswer === true
      ? "card correct"
      : correctAnswer === false
      ? "card incorrect"
      : "card"; */

  return (
    // <div className={cardClass}>  // start: no conditional rendering here
    // <div className={`${cardClass} ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
        <div className="card-inner">
        <div className="card-front">
          <div>
            {/* Displaying the question text */}
            <h2>{question.question}</h2>
            
            {/* Displaying the difficulty and categories */}
            <span>Level {question.difficulty} | {question.categories.join(", ")}</span>
            <button onClick={() => setFlipped(true)}>Zeige die Antwort</button>
          </div>
        </div>
        <div className="card-back">
          <div>
            {/* Displaying the answer */}
            <p>{question.answer}</p>
            <button onClick={() => setFlipped(false)}>Zeige die Frage</button>
            {/* <button onClick={(e) => { e.stopPropagation(); handleClick(true); }}>Correct</button>
            <button onClick={(e) => { e.stopPropagation(); handleClick(false); }}>Incorrect</button> */}
            {/* 
            <button onClick={() => handleClick(true)}>Correct</button>
            <button onClick={() => handleClick(false)}>Incorrect</button> 
            */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
