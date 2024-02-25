import React from 'react'
import './PriceDetails.css';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from 'react';

export default function PriceDetails() {
const [totalPrice,setTotalPrice] = useState(0);
const [totalDiscount, setDiscount] = useState(0);

const fetchCart = useSelector((state: RootState) => state.addToCart.value); //This is reducer name
useEffect(() => {
  if (fetchCart) {
    const cartTotal = fetchCart.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.price*currentValue.quantity),
      0
    );
    const totalDiscount = fetchCart.reduce(
      (a, c) =>
        a +
          ((c.price * c.discountPercentage * c.quantity) / 100),
      0
    );
    setTotalPrice((prev)=>cartTotal);
    setDiscount((prev)=>totalDiscount);
  }
}, [fetchCart, totalPrice, totalDiscount]);

  return (
    <div className="price-details-child">
      <h3>Price Details</h3>
      <div>
        <span>Total Price</span>
        <span>${(totalPrice + totalDiscount).toFixed(2)}</span>
      </div>
      <div>
        <span>Discount</span>
        <span className="cart-text-success">-${totalDiscount.toFixed(2)}</span>
      </div>
      <div>
        <span>Delivery Charges</span>
        <span>
          {" "}
          <span style={{ textDecoration: "line-through" }}>$5</span>{" "}
          <span className="cart-text-success">FREE Delivery</span>
        </span>
      </div>
      <div></div>
      <div>
        <span>
          <b>Total Amount</b>
        </span>
        <span>
          <b>${totalPrice.toFixed(2)}</b>
        </span>
      </div>
      <hr></hr>
      <div className="cart-text-success"> <b>
        You will save ${totalDiscount.toFixed(2)} on this order
        </b>
      </div>
    </div>
  );
}
