import React, { Component } from "react";
import Aux from "../../hoc/auxiliary";
import classes from "./layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideBar: false,
  };

  closeSideBarHandler = () => {
    this.setState({
      showSideBar: false,
    });
  };
  openSideBarHandler = () => {
    this.setState({
      showSideBar: true,
    });
  };
  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return {
        showSideBar: !prevState.showSideBar,
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar clicked={this.toggleSideDrawer} />
        <SideDrawer
          open={this.state.showSideBar}
          close={this.closeSideBarHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
