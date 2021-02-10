import { lazy, Suspense, useEffect } from "react";
// import Button from '../../../components/UI/Button/Button';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import * as actionCreater from '../../store/actions/index';
const ContactData = lazy(() =>
  import("../../components/Order/ContactData/ContactData")
);
const Checkout = (props) => {
  // const [ingredients, setIngredients] = useState({
  //   salad: 0,
  //   meat: 0,
  //   cheese: 0,
  //   bacon: 0,
  // });
  // const [totalPrice, setTotalPrice] = useState(null);
//  useEffect(() => {
//      {
      
  //     const query = new URLSearchParams(props.location.search); // extract the search value, remove the ? and so on
  //     const ingredien = {};
  //     let total = 0;
  //     for (let param of query.entries()) {
  //       // console.log(param)
  //       if(param[0] === 'total'){
  //         total = +param[1];
  //       } else{
  //         ingredien[param[0]] = +param[1];
  //       }
  //       //  console.log(ingredien)
  //     }
  //     console.log('ingredien ', ingredien)
  //     setIngredients(ingredien);
  //     setTotalPrice(total);


//      }
//  }, []);
  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };
  const continuedCheckoutHandler = () => {
    // console.log(props)
    props.history.replace("/checkout/contact-data");
  };
  let summary = <Redirect to="/" />;
  
  if (props.ingredientsState) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredientsState}
          cancel={cancelCheckoutHandler}
          continued={continuedCheckoutHandler}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <ContactData />
            </Suspense>
          )}
        />
      </div>
    );
  }
  return summary
};
const mapStateToProps = (state) => {
  // get the global state and reutrn it as a object that call ctr
  return {
    ingredientsState: state.burgerRed.ingredient,
    purchased: state.orderRed.purchased
  };
};


export default connect(mapStateToProps)(Checkout);
