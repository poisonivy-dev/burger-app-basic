import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/auxiliary";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  shouldComponentUpdate(nextProp, nextState) {
    return (
      this.props.show !== nextProp.show ||
      this.props.children !== nextProp.children
    );
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
