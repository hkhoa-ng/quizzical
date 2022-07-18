import QuestionsContext from "../QuestionsContext";
import { useContext } from "react";

export default function StartPage(props) {
  const { questions, generateQuestions } = useContext(QuestionsContext);

  function startQuiz() {
    props.startQuiz();
    generateQuestions();
  }
  return (
    <div className="start-page">
      <h1>Quizzical</h1>
      <p>An online, multiple choice trivia app! Powered by React.</p>
      <button onClick={startQuiz}>Start quiz</button>
    </div>
  );
}
