import Layout from "./hoc/Layout/Layout";
import Burgerbuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Auth from './containers/Auth/Auth';
// const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
const Orders = lazy(() => import("./containers/Orders/Orders"));
function App() {
  return (
  
      <Layout>
        {/* <Route
          path="/checkout"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Checkout />
            </Suspense>
          )}
        /> */}
        <Switch>
        <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Orders />
            </Suspense>
          )} />
          <Route path="/" component={Burgerbuilder}/>
        </Switch>

      
      </Layout>
 
  );
}

export default App;
