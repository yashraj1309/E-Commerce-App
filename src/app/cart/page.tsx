"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/types/ProductType";
import CartProduct from "@/components/CartProduct";
import Image from "next/image";
import PriceDetails from "@/components/PriceDetails";
import "./cart.css";

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const fetchCart = useSelector((state: RootState) => state.addToCart.value); //This is reducer name
  useEffect(() => {
    if (fetchCart) {
      setCart((prev) => fetchCart);
    }
  }, [fetchCart]);
  return (
    <div
      style={{
        margin: "5rem"
      }}
    >
      {cart.length === 0 ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Image
          src={"https://www.eventsqed.com/Images/empty-cart-icon-min.png"}
          alt="Cart is empty"
          height={200}
          width={200}
        />
        </div>
      ) : (
        <div className="cart-container">
          <div style={{display: 'flex', alignItems: 'center', gap: "1rem", flexDirection: 'column'}}>
            {cart.map((item) => {
              return <CartProduct product={item} key={item.id} />;
            })}
          </div>
          <div className="price-details">
          <PriceDetails />
          </div>
        </div>
      )}
    </div>
  );
}
