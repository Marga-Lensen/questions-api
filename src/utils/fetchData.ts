// src/utils/fetchData.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


export const fetchQuestions = async (): Promise<any> => {
    try {
      // const response = await fetch("http://localhost:5000/questions"); // works only on laptop
      const response = await fetch(`${API_URL}/questions`);
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  };
  