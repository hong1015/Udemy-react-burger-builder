import { Fragment, useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionCreater from '../../store/actions/index';

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

function Burgerbuilder(props) {
  // const [ingredientsState, setIngredientsState] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(4);
  // const [isPurchaseable, setIsPurchaseable] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  // const [isLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  useEffect(() => {
    console.log("ingredientsState ", props);
     props.getIngredientsHandler();
    
  }, []);
  const purchaseHandler = () => {
    setIsPurchasing(true);
  };
  const purchaseCloseHandler = () => {
    setIsPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    // const queryParams = [];

    // for (let i in props.ingredientsState) {
    //   queryParams.push(
    //     `${encodeURIComponent(i)}=${encodeURIComponent(props.ingredientsState[i])}`
    //   );
    // }
    // queryParams.push(`total=${props.totalPrice}`)

    // const queryString = queryParams.join("&");
    // console.log(queryParams);
    // props.history.push({
    //   pathname: "/checkout/",
    //   search: `?${queryString}`,
    // });
    props.history.push({
      pathname: "/checkout"
    });
  };

  const updatePurchasesState = (updateIngredients) => {
    const orderOn = Object.keys(updateIngredients)
      .map((ing) => {
        return updateIngredients[ing];
      })
      .reduce((c, n) => {
        return c + n;
      }, 0);
    return orderOn > 0;
  };

  // const addIngredientHandler = (type) => {
  //   const oldCount = ingredientsState[type];
  //   const updateCount = oldCount + 1;
  //   const updateIngredients = { ...ingredientsState };
  //   updateIngredients[type] = updateCount;

  //   const typePrice = INGREDIENT_PRICES[type];
  //   const oldPrice = totalPrice;
  //   const newPrice = oldPrice + typePrice;

  //   setIngredientsState(updateIngredients);
  //   setTotalPrice(newPrice);
  //   updatePurchasesState(updateIngredients);
  // };
  // const removeIngredientHandler = (type) => {
  //   const updateCount = ingredientsState[type] - 1;
  //   if (updateCount >= 0) {
  //     const updateIngredients = { ...ingredientsState };
  //     updateIngredients[type] = updateCount;

  //     const typePrice = INGREDIENT_PRICES[type];
  //     const newPrice = totalPrice - typePrice;

  //     setIngredientsState(updateIngredients);

  //     setTotalPrice(newPrice);
  //     updatePurchasesState(updateIngredients);
  //   }
  // };

  const diabledInfo = { ...props.ingredientsState };

  for (let key in diabledInfo) {
    diabledInfo[key] = diabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.isError ? <p>broekn</p> : <Spinner />;
  if (props.ingredientsState) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ingredientsState} />
        <BuildControls
          ingredients={props.ingredientsState}
          addIngredient={props.addIngredientHandler}
          removeIngredient={props.removeIngredientHandler}
          disabled={diabledInfo}
          price={props.totalPrice}
          isPurchaseable={updatePurchasesState(props.ingredientsState)}
          orderNow={purchaseHandler}
        />
      </Fragment>
    );
  
      orderSummary = (
        <OrderSummary
          order={props.ingredientsState}
          close={purchaseCloseHandler}
          continue={purchaseContinueHandler}
          price={props.totalPrice}
        />
      );
    
  }
  return (
    <Fragment>
      <Modal show={isPurchasing} close={purchaseCloseHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
}

const mapStateToProps = state =>{
  // get the global state and reutrn it as a object that call ctr
  return {
       ingredientsState: state.burgerRed.ingredient,
       totalPrice: state.burgerRed.totalPrice,
       isError: state.burgerRed.error
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    addIngredientHandler: (IngredientName) => dispatch(actionCreater.addIngredient(IngredientName)),
    removeIngredientHandler: (IngredientName) => dispatch(actionCreater.removeIngredient(IngredientName)),
    getIngredientsHandler: () => dispatch(actionCreater.getIngredients()),
    onInitPurchase: () => dispatch(actionCreater.purchaseInit())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Burgerbuilder, axios));
