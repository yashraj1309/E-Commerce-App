import React from 'react'
import './PriceDetails.css';

export default function PriceDetails() {
  return (
    <div className='price-details-child'>
      <h3>Price Details</h3>
      <div>
        <span>
          Price {"("} 1 item {")"}
        </span>
        <span>$1,322</span>
      </div>
      <div>
        <span>Discount</span>
        <span>-$1,999</span>
      </div>
      <div>
        <span>Delivery Charges</span>
       <span> <span style={{ textDecoration: "line-through" }}>$5</span> FREE Delivery</span>
      </div>
      <div></div>
      <div>
        <span><b>Total Amount</b></span>
        <span><b>$1,999</b></span>
      </div>
      <hr></hr>
      <div>
        You will save $1,999 on this order 
      </div>
    </div>
  );
}
