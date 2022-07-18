import "./styles.css";

import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";

import React, { useState } from "react";

import { QuestionsProvider } from "./QuestionsContext";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  function startQuiz() {
    setQuizStarted(true);
  }
  return (
    <QuestionsProvider>
      <main>
        {!quizStarted && <StartPage startQuiz={startQuiz} />}
        {quizStarted && <QuizPage />}
      </main>
    </QuestionsProvider>
  );
}
