import React, { useEffect } from "react";
import QuestionsContext from "../QuestionsContext";

export default function Answer(props) {
  const [state, setState] = React.useState(props.state);

  useEffect(() => {
    setState(props.state);
  }, [props.state]);

  const unselectedState = {
    backgroundColor: "transparent",
    border: "0.794239px solid #293264",
  };
  const selectedState = {
    backgroundColor: "#D6DBF5",
    border: "none",
  };
  const passiveState = {
    color: "#969FCD",
    backgroundColor: "transparent",
    border: "0.771045px solid #969FCD",
  };
  const wrongPassiveState = {
    color: "#969FCD",
    backgroundColor: "#F8BCBC",
    border: "none",
  };
  const correctState = {
    fontWeight: 500,
    backgroundColor: "#94D7A2",
    border: "none",
  };
  let styles = unselectedState;

  if (state === "init") {
    if (props.isSelected) {
      styles = selectedState;
    } else {
      styles = unselectedState;
    }
  } else if (state === "correct") {
    styles = correctState;
  } else if (state === "incorrect") {
    styles = wrongPassiveState;
  } else if (state === "passive") {
    styles = passiveState;
  }

  const handleClick = () => {
    props.toggle();
    props.generateAnswerElements();
  };

  return (
    <div className="answer" style={styles} onClick={handleClick}>
      <p>{props.value}</p>
    </div>
  );
}
