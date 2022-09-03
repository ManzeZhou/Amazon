import React, {useEffect, useState} from "react";
import "./Payment.css";
import {useDispatch, useSelector} from "react-redux";
import Checkout from "./Checkout";
import {CheckoutProduct} from "./CheckoutProduct";
import {Link, useNavigate} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import {baseUrl} from "./consts/helper";
import {emptyBasket} from "./action/action";
import {db}  from "./firebase.js";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basket = useSelector(state => state?.productReducer?.basket)
  console.log('basket ----->',basket)
  const userEmail = useSelector(state => state?.productReducer?.user)

  //use Stripe
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true)



  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {

    //   const response = await axios({
    //     method: 'post',
    //     // Stripe expects the total in a currencies subunits
    //     url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //   });
    //   setClientSecret(response.data.clientSecret)
    // }
      const response = await axios.post(`${baseUrl}/payments/create?total=${getBasketTotal(basket) * 100}`)
      setClientSecret(response.data.clientSecret)}

    // run an async function inside useEffect
    getClientSecret();

  }, [basket])

  console.log('the client secret is --->', clientSecret)
  console.log('the user is ---->', userEmail, 'the user id is ---->',userEmail.uid)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {

      //NOSQL database
      db
          .collection('users')
          .doc(userEmail?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          })

      // paymentIntent = paymentConfirmation
      setSucceeded(true)
      setError(null)
      setProcessing(false);

      dispatch(emptyBasket());
      navigate('/orders', { replace: true });
    })
  }

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '')
  }

  //calculate the total price

  const getBasketTotal = (basket) => {
    let initialPrice = 0
    let subPrice = basket?.reduce(function (prev, curr){
      return prev + curr.price
    }, initialPrice)

    return (subPrice)
  }



  return (
      <div className="payment">
        <div className="payment_container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} {!basket.length ? 'item' : 'items'}</Link>)
          </h1>
          {/*delivery address*/}
          <div className="payment_section">

            <div className="payment_title">
              <h3>Delivery Address</h3>
            </div>

            <div className="payment_address">

              <p>{userEmail?.email}</p>
              <p>Address info</p>
              <p>Address city</p>

            </div>


          </div>

          {/*review items*/}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Review items and delivery</h3>
            </div>

            <div className="payment_items">
              {basket.map((item) => (<CheckoutProduct
                  id = {item.id}
                  title = {item.title}
                  image = {item.image}
                  price = {item.price}
                  rating = {item.rating}
              />))}
            </div>
          </div>

          {/*payment method*/}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Payment Method</h3>
            </div>

            <div className="payment_details">
              {/*Stripe*/}
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>

                <div className="payment_priceContainer">
                  <CurrencyFormat
                  renderText={(value) => (
                      <>
                        <h3>Order Total: {value}</h3>
                      </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>
                      {processing ? <p>Processing</p> : 'Buy Now'}
                    </span>
                  </button>
                </div>

                {/*Errors*/}
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}