import { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
class contactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  render() {
    <div className={classes.ContactData}>
      <form>
        <h4>Enter your Contact Data</h4>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" email="email" placeholder="Your Email" />
        <input type="text" street="street" placeholder="Street" />
        <input type="text" postal="postal" placeholder="Your Postal Code" />
        <Button btnType="Success">ORDER</Button>
      </form>
    </div>;
  }
}

export default contactData;
