import Order from "../../components/Order/Order";
import { useState, useEffect } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreater from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
const Orders = (props) => {
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
   props.getOrderActionHandler();
  }, []);


  let  orderContainer = <Spinner/>;
  if(!props.loadingOrder){
    orderContainer = props.ordersState.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price.toFixed(2)} />));
  }
 
  return (
    <div>
      {orderContainer }
    </div>
  );
};

const mapStateToProps = state =>{
  // get the global state and reutrn it as a object that call ctr
  return {
       ordersState: state.orderRed.orders,
       loadingOrder: state.orderRed.loadingOrder
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    getOrderActionHandler: () => dispatch(actionCreater.getOrderAction())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
