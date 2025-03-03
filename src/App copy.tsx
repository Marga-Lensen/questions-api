import { useEffect, useState } from "react";

interface Question {
  question: string;
  answer: string;
  difficulty: number;
  categories: string[];
  toBeDeleted?: boolean;
}

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      {questions.map((q, index) => (
        <p key={index}>{q.question}</p>
      ))}
    </div>
  );
};

export default App;
