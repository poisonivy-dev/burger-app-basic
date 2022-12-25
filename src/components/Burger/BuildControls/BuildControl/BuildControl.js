import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <div className={classes.Less}>less</div>
      <div className={classes.More}>more</div>
    </div>
  );
};

export default buildControl;
