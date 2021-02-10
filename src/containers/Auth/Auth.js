import { Component, Fragment } from "react";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionCreater from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {
  state = {
    control: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    
    },
    formValid: false,
    isSignUp: true
  };

  switchAuthModeHandler = () => {
this.setState(prev => {
  return {
    isSignUp: !prev.isSignUp
  }
})
  }
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
    const updateForm = { ...this.state.control }; // clone object
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
      control: updateForm,
      formValid: isFormValid,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthHandler(this.state.control.email.value, this.state.control.password.value, this.state.isSignUp);
  }
  render() {
    const InputEl = [];
    const controlForm = this.state.control;
    for (let key in controlForm) {
      InputEl.push(
        <Input
          key={key}
          elementType={controlForm[key].elementType}
          elementConfig={controlForm[key].elementConfig}
          value={controlForm[key].value}
          changed={(event) => this.inoutChangeHandler(event, key)}
          invalid={!controlForm[key].valid}
          isRequired={controlForm[key].validation}
          isTouched={controlForm[key].touched}
        />
      );
    }
    let form = (
      <Fragment>
      <form onSubmit={this.submitHandler}>
        {InputEl}
        <Button btnType="Success" disabled={!this.state.formValid}>
        {this.state.isSignUp ? 'SignUp' : 'Log in'}
        </Button>
      </form>
      <Button btnType="Danger" clicked={this.switchAuthModeHandler} >Switch to {this.state.isSignUp ? 'SignIn' : 'SignUp'}</Button>
      </Fragment>
    );

    if(this.props.loading){
      form = <Spinner />
    }

    let errorMessage = null;

    if(this.props.error){
      errorMessage = (
        <p>
          {this.props.error.message}
        </p>
      )
    }

    return <div className={classes.AuthContainer}> {errorMessage} {form}</div>;
  }
}

const mapStateToProps = state =>{
  // get the global state and reutrn it as a object that call ctr
  return {
       loading: state.authRed.loading,
       error: state.authRed.error
  };
}
const mapDispatchToProps = dispatch =>{
  return {
    onAuthHandler: (email, password, method) => dispatch(actionCreater.authCheck(email, password, method)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
