import React from "react";
import "./CheoutProduct.css";
import {useDispatch, useSelector} from "react-redux";
import {removeProduct} from "./action/action";

export const CheckoutProduct = ({id, image, title, price, rating, hideButton}) => {



    const dispatch = useDispatch()

    const removeFromBasket = () => {
        dispatch(removeProduct(id))

    }
  return(
      <div className="checkoutProduct">
          <img src={image} className="checkoutProduct_image" alt=""/>
          <div className="checkoutProduct_info">
              <p className="checkoutProduct_title">{title}</p>
              <p className="checkoutProduct_price">
                  <small>$</small>
                  <strong>{price}</strong>
              </p>
              <div className="checkoutProduct_rating">
                  {Array(rating).fill().map((i) =>
                      <p key={i}>⭐</p>
                  )}
              </div>
              {/*{!hideButton && (*/}
              {/*    <button onClick={removeFromBasket}>Remove from basket</button>*/}
              {/*)}*/}
              <button onClick={removeFromBasket}>Remove from basket</button>


          </div>
      </div>
  )
}