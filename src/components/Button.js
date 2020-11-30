import React from "react";

const Button = (props) => {
  console.log("render button" + props.children);
  return (
    <React.Fragment>
      <button onClick={props.handleClick}>{props.children}</button>
    </React.Fragment>
  );
};

export default React.memo(Button);
