import classes from "./Modal.css";
import React, {Component, Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  componentDidUpdate(){
    console.log('modal update')
  }
  render(){
    return   (
      <Fragment>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? 1 : 0,
          }}
        >
          {this.props.children} 
        </div>
        <Backdrop show={this.props.show} clicked={this.props.close}></Backdrop>
      </Fragment>
    ) 
  }
 
};

export default Modal;

