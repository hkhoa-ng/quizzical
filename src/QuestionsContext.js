import React, { createContext, useState } from "react";
import { shuffleArray, decodeEntity } from "./utils/utils";
import { generateAnswers } from "./utils/generators";
import { nanoid } from "nanoid";

const QuestionsContext = createContext();

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const setGameScore = (type) => {
    if (type === "increment") {
      setScore((prev) => prev + 1);
    } else if (type === "reset") {
      setScore(0);
    }
  };

  const printQuestions = () => {
    console.log(questions);
  };

  const generateQuestions = () => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(
          data.results.map((entry) => {
            const answers = shuffleArray([
              generateAnswers(entry.correct_answer, true),
              ...entry.incorrect_answers.map((o) => generateAnswers(o, false)),
            ]);

            return {
              id: nanoid(),
              question: decodeEntity(entry.question),
              allAnswers: answers,
            };
          })
        );
      });
  };

  const checkAnswer = () => {
    if (!checkAllAnswersSelected()) {
      alert("You must answer all questions!");
      return;
    }

    // Checking the answers
    let newQuestionsArr = [];
    questions.forEach((question) => {
      let newAnswersArr = [];
      question.allAnswers.forEach((ans) => {
        if (ans.isSelected && ans.isCorrect) {
          setScore((prev) => (prev += 1));
          newAnswersArr.push({
            ...ans,
            state: "correct",
          });
        } else if (ans.isSelected && !ans.isCorrect) {
          newAnswersArr.push({
            ...ans,
            state: "incorrect",
          });
        } else if (!ans.isSelected && ans.isCorrect) {
          newAnswersArr.push({
            ...ans,
            state: "correct",
          });
        } else {
          newAnswersArr.push({
            ...ans,
            state: "passive",
          });
        }
      });
      newQuestionsArr.push({
        ...question,
        allAnswers: newAnswersArr,
      });
    });
    setQuestions(newQuestionsArr);
  };

  const checkAllAnswersSelected = () => {
    const allAreSelected = questions.every((question) =>
      question.allAnswers.find((answer) => answer.isSelected)
    );
    return allAreSelected ? true : false;
  };

  const toggleSelectedAnswer = (questionId, answerId) => {
    let newQuestions = [];
    questions.forEach((question) => {
      if (question.id === questionId) {
        // Create a copy of the current question object
        let currQuestion;
        let currQuestionAllAnswers = [];
        question.allAnswers.forEach((answer) => {
          let currAnswer = answer;
          if (answer.id === answerId) {
            currQuestionAllAnswers.push({
              ...currAnswer,
              isSelected: !currAnswer.isSelected,
            });
          } else {
            currQuestionAllAnswers.push(currAnswer);
          }
        });
        currQuestionAllAnswers.forEach((answer) => {
          if (answer.id !== answerId) {
            answer.isSelected = false;
          }
        });
        currQuestion = {
          ...question,
          allAnswers: currQuestionAllAnswers,
        };
        newQuestions.push(currQuestion);
      } else {
        newQuestions.push(question);
      }
    });
    setQuestions(newQuestions);
  };

  const contextValues = {
    questions,
    score,
    generateQuestions,
    printQuestions,
    checkAnswer,
    toggleSelectedAnswer,
    checkAnswer,
    setScore,
  };

  return (
    <QuestionsContext.Provider value={contextValues}>
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsContext;
