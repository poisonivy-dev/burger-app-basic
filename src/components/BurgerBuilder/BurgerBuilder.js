import React, { Component } from "react";
import Aux from "../../hoc/auxiliary";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };
  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => (sum += el), 0);
    this.setState({ purchaseable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    const newCounter = oldCounter + 1;

    const ingredients = {
      ...this.state.ingredients,
    };
    ingredients[type] = newCounter;

    const oldPriceTotal = this.state.totalPrice;
    const newPriceTotal = oldPriceTotal + INGREDIENTS_PRICES[type];

    this.setState({
      ingredients: ingredients,
      totalPrice: newPriceTotal,
    });
    this.updatePurchaseState(ingredients);
  };
  removeIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    if (oldCounter <= 0) return;
    const newCounter = oldCounter - 1;

    const ingredients = {
      ...this.state.ingredients,
    };
    ingredients[type] = newCounter;

    const oldPriceTotal = this.state.totalPrice;
    const newPriceTotal = oldPriceTotal - INGREDIENTS_PRICES[type];

    this.setState({
      ingredients: ingredients,
      totalPrice: newPriceTotal,
    });
    this.updatePurchaseState(ingredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  closePurchaseHandler = () => {
    this.setState({
      purchasing: false,
    });
  };
  continuePurchaseHandler = () => {
    alert("You Continue");
  };
  render() {
    const disableIngredientRemoval = {
      ...this.state.ingredients,
    };
    for (let key in disableIngredientRemoval) {
      disableIngredientRemoval[key] = disableIngredientRemoval[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.closePurchaseHandler}
        >
          <OrderSummary
            cancel={this.closePurchaseHandler}
            continue={this.continuePurchaseHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disableIngredientRemoval}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
