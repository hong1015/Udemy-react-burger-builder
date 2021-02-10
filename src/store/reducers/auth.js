import * as actionTypes from "../actions/actionType";

const InState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
};

const authSuccess = (newState, action) => {
  newState.loading = false;
  newState.token = action.token;
  newState.userId = action.userId;
  return newState;
};

const authLogout = (newState) => {
  newState.token = null;
  newState.userId = null;
  return newState;
};
const AuthReducer = (state = InState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.AUTH_START:
      newState.error = null;
      newState.loading = true;
      break;
    case actionTypes.AUTH_SUCCESS:
        return authSuccess(newState, action)
  
    case actionTypes.AUTH_FAIL:
      newState.loading = false;
      newState.error = action.authError;
      break;
    case actionTypes.AUTH_LOGOUT:
      return authLogout(newState);
      break;
    default:
      return state;
  }

  return newState;
};

export default AuthReducer;
