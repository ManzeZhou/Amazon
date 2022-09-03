import React, {useEffect, useState} from "react";
import "./Orders.css";
import {db}  from "./firebase.js";
import {useDispatch, useSelector} from "react-redux";
import Order from "./Order";

export const Orders = () => {

  const dispatch = useDispatch();

  const basket = useSelector(state => state?.productReducer?.basket)

  const userEmail = useSelector(state => state?.productReducer?.user)

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // only if user exists
    if(userEmail) {
      db
          .collection('users')
          .doc(userEmail?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          })
    } else {
      setOrders([])
    }

  }, [userEmail])

  return (
      <div className="orders">
        <h1>Your Orders</h1>

        <div className="orders_order">
          {orders?.map(order => (
              <Order order={order} />
          ))}
        </div>
      </div>
  )
}

