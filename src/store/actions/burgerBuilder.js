import * as actionTypes from './actionType';
import axios from "../../axios-orders";

export const addIngredient = (IngredientName) =>{
    return {
        type: actionTypes.ADD_INGEREDIENT,
        ingName: IngredientName
    }
}

export const removeIngredient = (IngredientName) =>{
    return {
        type: actionTypes.REMOVE_INGEREDIENT,
        ingName: IngredientName
    }
}

export const setIngredients = (Ingredient) =>{
return{
    type: actionTypes.SET_INGEREDIENT,
    ingred: Ingredient
}
}

export const setError = () =>{
    return{
        type: actionTypes.SET_ERROR
    }
}
export const getIngredients = () =>{
    return dispatch =>{
        // this is usable by react-thunk
        axios
        .get("/ingredients.json")
        .then((result) => {
          console.log("result ", result.data);
          dispatch(setIngredients(result.data));
        }).catch(error =>{
            dispatch(setError())
        })
    }
}