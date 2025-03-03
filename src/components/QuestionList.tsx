// src/components/QuestionList.tsx
import React from 'react';
import { useFetchData } from '../contexts/FetchDataContext';
import QuestionCard from './QuestionCard.tsx';  // Import QuestionCard component
// import QuestionCard from './QuestionCard-start.tsx';  // Import QuestionCard component

const QuestionList: React.FC = () => {
  const { questions, loading, error } = useFetchData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="question-list">
      {questions.map((q) => {
        const cardProps = {
          question: q,
          onAnswer: (isCorrect: boolean) => console.log(isCorrect),
          onVisited: () => console.log("Visited"),
          visited: false,
          correctAnswer: null,
        };
  
        return <QuestionCard key={q._id} {...cardProps} />;
      })}
    </div>
  );
  
};

export default QuestionList;
