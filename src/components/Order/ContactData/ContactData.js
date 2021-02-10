import classes from "./ContactData.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import React, { Component } from "react";
import * as actionCreater from "../../../store/actions/index";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-orders";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      deliverMethos: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheap", displayValue: "Cheap" },
          ],
        },
        value: "fastest",
      },
    },
    formValid: false,
  };

  checkValidaity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.replace(/ /g, "").length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.replace(/ /g, "").length <= rules.minLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inoutChangeHandler = (event, id) => {
    // console.log("event ", event);
    const updateForm = { ...this.state.orderForm }; // clone object
    const updateFormEl = { ...updateForm[id] }; // need to clone it again if child is object too, or it will effect the orginal
    updateFormEl.value = event.target.value;
    updateFormEl.valid = this.checkValidaity(
      updateFormEl.value,
      updateFormEl.validation
    );
    updateFormEl.touched = true;
    updateForm[id] = updateFormEl;
    let isFormValid = true;
    for (let inputId in updateForm) {
      if (updateForm[inputId].validation) {
        isFormValid = updateForm[inputId].valid && isFormValid;
      }
    }

    this.setState({
      orderForm: updateForm,
      formValid: isFormValid,
    });
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formValue = {};
    for (const value in this.state.orderForm) {
      formValue[value] = this.state.orderForm[value].value;
    }
    const order = {
      ingredients: this.props.ingredientsState,
      price: this.props.totalPriceState,
      orderDate: formValue,
    };

    this.props.postOrderHandler(order);
  };

  render() {
    // let reirect = null;
    // if (this.props.submitted) {
    //   reirect = <Redirect to="/" />;
    // }
    const InputEl = [];
    const orderForm = this.state.orderForm;
    for (let key in orderForm) {
      InputEl.push(
        <Input
          key={key}
          elementType={orderForm[key].elementType}
          elementConfig={orderForm[key].elementConfig}
          value={orderForm[key].value}
          changed={(event) => this.inoutChangeHandler(event, key)}
          invalid={!orderForm[key].valid}
          isRequired={orderForm[key].validation}
          isTouched={orderForm[key].touched}
        />
      );
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {InputEl}
        <Button btnType="Success" disabled={!this.state.formValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        {/* {reirect} */}
        <h4>enter</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // get the global state and reutrn it as a object that call ctr
  return {
    ingredientsState: state.burgerRed.ingredient,
    totalPriceState: state.burgerRed.totalPrice,
    loading: state.orderRed.loadingOrder,
    // submitted: state.orderRed.orderSubmitted
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postOrderHandler: (order) => dispatch(actionCreater.postOrderAction(order)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
