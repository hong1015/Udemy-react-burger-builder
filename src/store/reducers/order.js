import * as actionTypes from "../actions/actionType";

const InState = {
    orders: [],
  loadingOrder: false,
  purchased: false,
};

const OrderReducer = (state = InState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
        newState.loadingOrder = true;
      break;
    case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        newState.loadingOrder = false;
        newState.purchased = true;
        newState.orders = state.orders.concat(newOrder);
      break;
      case actionTypes.PURCHASE_INIT:
        newState.purchased = false;
        break;
    case actionTypes.PURCHASE_BURGER_FAIL:
        newState.loadingOrder = false;
      break;
      case actionTypes.GET_ORDER_LIST_START:
        newState.loadingOrder = true;
      break;
      case actionTypes.GET_ORDER_LIST_SUCCESS :
        newState.orders = action.orderData
        newState.loadingOrder = false;
      break;
      case actionTypes.GET_ORDER_LIST_FAIL:
        newState.loadingOrder = false;
      break; 

    default:
      return state;
  }
  return newState;
};

export default OrderReducer;
