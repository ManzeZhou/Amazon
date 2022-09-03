import React from "react";
import "./Product.css";
import {useDispatch} from "react-redux";
import {fetchProduct} from "./action/action";


function Product({id, title, image, price, rating}) {
    const dispatch = useDispatch()
    const addToBasket = () => {
        dispatch(fetchProduct({id, title, image, price, rating}))

    }

    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map((i) =>
                        <p key={i}>⭐</p>
                        )}
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product