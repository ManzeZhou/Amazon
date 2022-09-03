import React, {useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import {Login} from "./Login";
import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import {setUser} from "./action/action";

import {Payment} from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {Orders} from "./Orders";


function App() {

    const dispatch =useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log('the user is ', authUser);

            if (authUser) {
                // the user just logged in / was logged in
                dispatch(setUser(authUser))

            } else {
                // the user is logged out
                dispatch(setUser(null))
            }
        })
    }, [])

    //use Stripe
    const promise = loadStripe('pk_test_51LcFEFGdUtBcZh37T40mruvlnNnl2m1EqsUzBGtnSCrOtcxSU1aa2CO5qksADWlACxGrzHEZ3pK5ByNdVaQMk8er00clB30vrB');

  return (
      <Router>
          <div className="app">


              <Routes>
                  <Route path="/" element={[<Header/>, <Home/>]}/>
                  <Route path="/checkout" element={[<Header/>, <Checkout/>]}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/payment" element={[<Header/>, <Elements stripe={promise}><Payment /></Elements>]}/>
                  <Route path="/orders" element={[<Header/>, <Orders/>]}/>
              </Routes>

          </div>
      </Router>


  );
}

export default App;
