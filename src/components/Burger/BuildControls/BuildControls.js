import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((cntrl) => (
        <BuildControl
          label={cntrl.label}
          key={cntrl.label}
          added={() => {
            props.ingredientsAdded(cntrl.type);
          }}
          removed={() => {
            props.ingredientsRemoved(cntrl.type);
          }}
        />
      ))}
    </div>
  );
};

export default buildControls;
