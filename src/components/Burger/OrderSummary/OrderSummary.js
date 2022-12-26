import React from "react";
import Aux from "../../../hoc/auxiliary";
const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((ingKey) => (
    <li key={ingKey}>
      <span style={{ textTransform: "capitalize" }}>{ingKey}</span> :
      {props.ingredients[ingKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p> A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
