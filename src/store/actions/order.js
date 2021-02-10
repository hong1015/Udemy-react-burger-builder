import * as actionTypes from "./actionType";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const postOrderActionStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const postOrderAction = (orderData) => {
  return (dispatch) => {
    dispatch(postOrderActionStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const getOrderAction = () => {
  return (dispatch) => {
    dispatch(getOrderStart());
    axios
      .get("/orders.json")
      .then((results) => {
        //   setLoading(false);
        const orders = results.data;
        const ordersArr = [];
        for (let key in orders) {
          ordersArr.push({
            ...orders[key],
            id: key,
          });
        }
        //   setOrders(ordersArr);
        dispatch(getOrderSuccess(ordersArr));
      })
      .catch((err) => {
        //   setLoading(false);
        dispatch(getOrderFail(err));
      });
  };
};

export const getOrderStart = () => {
  return {
    type: actionTypes.GET_ORDER_LIST_START,
  };
};

export const getOrderSuccess = (ordersArr) => {
  return {
    type: actionTypes.GET_ORDER_LIST_SUCCESS,
    orderData: ordersArr,
  };
};

export const getOrderFail = (error) => {
  return {
    type: actionTypes.GET_ORDER_LIST_FAIL,
    error: error,
  };
};

