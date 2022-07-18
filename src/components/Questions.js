import React, { useContext, useState, useEffect } from "react";

import Answer from "./Answer";
import HorizontalLine from "./HorizontalLine";

import QuestionsContext from "../QuestionsContext";

export default function Question(props) {
  const { questions, toggleSelectedAnswer } = useContext(QuestionsContext);
  const [allAnswerElements, setAllAnswerElements] = useState([]);

  useEffect(() => {
    setAllAnswerElements(generateAnswerElements);
  }, [questions]);

  const generateAnswerElements = () => {
    return questions.map((question) => {
      if (question.id === props.id) {
        return question.allAnswers.map((o) => {
          return (
            <Answer
              id={o.id}
              key={o.id}
              value={o.value}
              isCorrect={o.isCorrect}
              isSelected={o.isSelected}
              state={o.state}
              toggle={() => toggleSelectedAnswer(props.id, o.id)}
              generateAnswerElements={generateAnswerElements}
            />
          );
        });
      }
    });
  };

  // generateAnswerElements();

  return (
    <div className="question">
      <h3>{props.question}</h3>
      <div className="answer-container">{allAnswerElements}</div>
      <HorizontalLine thickness="1px" color="#DBDEF0" distance="20px" />
    </div>
  );
}
