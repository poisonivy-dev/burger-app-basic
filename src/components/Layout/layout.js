import React from "react";
import Aux from "../../hoc/auxiliary";

const layout = (props) => {
  return (
    <Aux>
      <div>Navbar, Sidebar, backdrop</div>
      <main>{props.children}</main>
    </Aux>
  );
};

export default layout;
