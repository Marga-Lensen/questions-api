// src/App.tsx
import React from "react";
import { FetchDataProvider, /* useFetchData */ } from "./contexts/FetchDataContext.tsx";
import QuestionList from "./components/QuestionList";
import Footer from "./components/Footer.tsx";
import './App.css'

/* const QuestionList: React.FC = () => {
  const { questions, loading, error } = useFetchData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {questions.map((q, index) => (
        <p key={index}>{q.question}</p>
        // <p key={index}><QuestionCard /></p>
      ))}
    </div>
  );
}; */

const App: React.FC = () => {
  return (
    <FetchDataProvider>
      <div className="game-container">
        <h1>Quiz Game</h1>
        <div className="question-container">
        <QuestionList />
        </div>
        <Footer />
      </div>
    </FetchDataProvider>
  );
};

export default App;
