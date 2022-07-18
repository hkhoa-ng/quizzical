import React from "react";

export default function HorizontalLine(props) {
  const styles = {
    borderTop: `${props.thickness} solid ${props.color}`,
    width: "100%",
    marginTop: props.distance,
    marginBottom: props.distance,
  };
  return <div style={styles}></div>;
}
