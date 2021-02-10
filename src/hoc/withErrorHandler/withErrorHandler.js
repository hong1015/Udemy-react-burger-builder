import { Fragment, Component } from "react";
// import classes from "./withErrorHandler.css";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrapperComponet, axios) => {
return class extends Component{

  state ={
    error: null
  }
  componentDidMount(){
    this.reqInterceptor = axios.interceptors.request.use( req => {
      this.setState( { error: null } );
      return req;
  } );
  this.resInterceptor = axios.interceptors.response.use( res => res, error => {
      this.setState( { error: error } );
  } );
}

componentWillUnmount () {
  axios.interceptors.request.eject( this.reqInterceptor );
  axios.interceptors.response.eject( this.resInterceptor );
}
  clearError = () => {
    this.setState({error: null});
  }
  render(){
    return (
      <Fragment>
        <Modal show={this.state.error} close={this.clearError}>
          OH no! {this.state.error ? this.state.error.message : null}
        </Modal>
            <WrapperComponet {...this.props}/>
      </Fragment>
  
    )
  }
}
};

export default withErrorHandler;
