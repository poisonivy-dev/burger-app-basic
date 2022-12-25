import "./App.css";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Layout from "./components/Layout/layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
