import "./App.css";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Layout from "./hoc/Layout/layout";
import { Route, Switch } from "react-router-dom";
import Burger from "./components/Burger/Burger";
function App() {
  return (
    <div className="App">
      <Layout>
        {/* <BurgerBuilder />
        <Checkout /> */}
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
