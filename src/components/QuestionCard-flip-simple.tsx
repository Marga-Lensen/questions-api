import React, { useState } from "react";
import "../styles/QuestionCard.scss";

interface CardProps {
  question: string;
  answer: string;
}

const QuestionCard: React.FC<CardProps> = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`question-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">
        <div className="card-front">
          <p>{question}</p>
        </div>
        <div className="card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
