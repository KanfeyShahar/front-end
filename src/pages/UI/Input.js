import React from "react";

import classes from "./input.module.css";

const Input = React.forwardRef((props,ref) => {
  return (
    <div>
      {" "}
      <div className={classes.input}>
        <button>+</button>
        <labal htmlFor={props.input.id}>{props.labal}</labal>
        <input ref={ref} {...props.input} />
      </div>
    </div>
  );
});

export default Input;
