import React from "react";
import Aux from "../../hoc/auxiliary";
import classes from "./layout.module.css";
const layout = (props) => {
  return (
    <Aux>
      <div>Navbar, Sidebar, backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
