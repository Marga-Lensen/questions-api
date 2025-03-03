// src/contexts/FetchDataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchQuestions } from "../utils/fetchData";

interface Question {
  _id: string;  // <-- Add this field
  question: string;
  answer: string;
  difficulty: number;
  categories: string[];
  toBeDeleted?: boolean;
}


interface FetchDataContextType {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

// Correctly typing the children prop
interface FetchDataProviderProps {
  children: ReactNode;
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(
  undefined
);

const FetchDataProvider: React.FC<FetchDataProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  return (
    <FetchDataContext.Provider value={{ questions, loading, error }}>
      {children}
    </FetchDataContext.Provider>
  );
};

const useFetchData = (): FetchDataContextType => {
  const context = useContext(FetchDataContext);
  if (!context) {
    throw new Error("useFetchData must be used within a FetchDataProvider");
  }
  return context;
};

export { FetchDataProvider, useFetchData };
