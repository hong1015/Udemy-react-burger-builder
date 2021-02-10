
import React, { Component, Fragment } from "react";
import Button from '../../UI/Button/Button';
import PropTypes from "prop-types";

class OrderSummary extends Component  {

  componentDidUpdate(){
    console.log('update')
  }

render(){
  const orderKeyArray = Object.keys(this.props.order);
  const list = orderKeyArray.map((ing) => {
    return (
      <li key={ing}>
        <b>{ing}</b>: {this.props.order[ing]}
      </li>
    );
  });

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Burder stuff</p>
      <ul>{list}</ul>
      <b>Total price: {this.props.price.toFixed(2)}</b>
      <p>check out?</p>
      <Button btnType="Danger" clicked={this.props.close}>Cancel</Button>
      <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
    </Fragment>
  );
}
  
};


OrderSummary.propTypes ={
    order: PropTypes.object,
    price: PropTypes.number,
    close: PropTypes.func,
    continue: PropTypes.func,
  }

export default OrderSummary;
