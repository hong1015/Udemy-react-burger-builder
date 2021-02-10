import * as actionTypes from './actionType';
import axios from "axios";

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (data) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.idToken,
        userId: data.localId
    }
}
export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        authError: error
    }
}
export const logout = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const authCheck = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2L2CF6D4Y3Y68KBDlenUYKegVVWV311k';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2L2CF6D4Y3Y68KBDlenUYKegVVWV311k'
        } 

        axios
        .post(url, authData)
        .then((result) => {
          console.log("result ", result.data);
          dispatch(authSuccess(result.data));
          dispatch(checkAuthTimeout(result.data.expiresIn));
        }).catch(err =>{
            console.log('err ', err)
            dispatch(authFail(err.response.data.error))
        });
    }
}
