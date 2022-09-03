import {ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_USER} from "../consts/helper";

export const fetchProduct = (product) => {
  return {
      type: ADD_TO_BASKET,
      payload: product,
  }
}

export const removeProduct = (id) => {
    return {
        type:REMOVE_FROM_BASKET,
        payload:id,
    }
}

export const setUser = (user) => {
  return {
      type: SET_USER,
      payload: user,
  }}

export const emptyBasket = () => {
    return {
        type: EMPTY_BASKET,
    }
}

