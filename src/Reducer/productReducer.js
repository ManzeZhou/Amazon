import {ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_USER} from "../consts/helper";

const productInitialState = {
    basket: [],
    user: null,
}

export const productReducer = (state = productInitialState, action) => {
  switch (action?.type) {


      case ADD_TO_BASKET:
          return {
              ...state, basket: [...state.basket, action?.payload]
          };


      case EMPTY_BASKET:
          return {
              ...state, basket:[]
          };


      case REMOVE_FROM_BASKET:

          // find the product that needs to be removed
          const index = state?.basket?.findIndex(
              (basketItem) => basketItem.id === action.payload);
          console.log(index)
          let newBasket = [...state.basket]
          //remove the index
          if (index >= 0) {
              newBasket.splice(index, 1);
          }else {
              console.warn(
                  `Can't remove product id:${action.id} as its not in the basket`
              )
          }
          return {
              ...state, basket: newBasket
          }

      case SET_USER :

          return {
              ...state,
              user: action?.payload
          }


      default:
          return state
  }

}