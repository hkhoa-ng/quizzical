import React, { useEffect, useState, useContext } from "react";

import QuestionsContext from "../QuestionsContext";

import Question from "../components/Questions";

export default function QuizPage() {
  const { questions, checkAnswer, score, setScore, generateQuestions } =
    useContext(QuestionsContext);
  const [gameOver, setGameOver] = useState(false);
  const [questionElements, setQuestionElements] = useState([]);

  const generateQuestionElements = () => {
    return questions.map((question) => {
      return (
        <Question
          key={question.id}
          id={question.id}
          question={question.question}
          allAnswers={question.allAnswers}
        />
      );
    });
  };

  useEffect(() => {
    setQuestionElements(generateQuestionElements());
  }, [questions]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    generateQuestions();
  };

  const displayResult = () => {
    setGameOver(true);
  };

  const handleCheckAnswer = () => {
    checkAnswer();
    displayResult();
  };

  return (
    <div className="quiz-page">
      <div className="questions-container">{questionElements}</div>
      {!gameOver && (
        <button className="check-answer" onClick={handleCheckAnswer}>
          Check answers
        </button>
      )}

      {gameOver && (
        <div className="gameover">
          <h3>You scored {score}/5 correct answers!</h3>
          <button className="check-answer" onClick={restartGame}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
