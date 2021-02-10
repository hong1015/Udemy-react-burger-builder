import * as actionTypes from "../actions/actionType";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const InState = {
  ingredient: null,
  totalPrice: 4,
  error: false,
};
const BurgerReducer = (state = InState, action) => {
  const newState = { ...state };
  const newIng = { ...state.ingredient };
  switch (action.type) {
    case actionTypes.ADD_INGEREDIENT:
      newIng[action.ingName] = state.ingredient[action.ingName] + 1;
      newState.ingredient = newIng;
      newState.totalPrice =
        state.totalPrice + INGREDIENT_PRICES[action.ingName];
      break;
    case actionTypes.REMOVE_INGEREDIENT:
      newIng[action.ingName] = state.ingredient[action.ingName] - 1;
      newState.ingredient = newIng;

      newState.totalPrice =
        state.totalPrice - INGREDIENT_PRICES[action.ingName];
      break;
    case actionTypes.SET_ERROR:
      newState.error = true;
      break;
      case actionTypes.SET_INGEREDIENT:
        newState.ingredient = action.ingred;
        newState.error = false;
        newState.totalPrice = InState.totalPrice
      break;
  }

  return newState;
};

export default BurgerReducer;
