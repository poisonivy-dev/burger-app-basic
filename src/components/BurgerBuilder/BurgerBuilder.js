import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/auxiliary";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withHandlerError";
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loader: false,
    error: false,
  };
  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-747a5-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => this.setState({ error: err }));
  }
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
    const queryString = [];
    for (let i in this.state.ingredients) {
      queryString.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryString.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });

    // this.setState({ loader: true });
    // const order = {
    //   ingredients: { ...this.state.ingredients },
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: "MAX",
    //     address: "california, USA",
    //     contact: "021456789",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((res) => this.setState({ loader: false, purchasing: false }))
    //   .catch((err) => {
    //     this.setState({ loader: false, purchasing: false });
    //     console.log(err);
    //   });
  };
  render() {
    const disableIngredientRemoval = {
      ...this.state.ingredients,
    };
    for (let key in disableIngredientRemoval) {
      disableIngredientRemoval[key] = disableIngredientRemoval[key] <= 0;
    }
    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients cannot be found</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          cancel={this.closePurchaseHandler}
          continue={this.continuePurchaseHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loader) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.closePurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
