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
      <p>
        Current Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
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
          disabled={props.disabled[cntrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
