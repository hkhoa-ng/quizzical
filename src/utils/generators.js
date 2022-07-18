import { nanoid } from "nanoid";
import { decodeEntity } from "./utils";

import React, { useContext } from "react";
import QuestionsContext from "../QuestionsContext";

import Question from "../components/Questions";
import Answer from "../components/Answer";

function generateAnswers(answer, isCorrect) {
  return {
    id: nanoid(),
    value: decodeEntity(answer),
    isCorrect: isCorrect,
    isSelected: false,
    state: "init",
  };
}

export { generateAnswers };
