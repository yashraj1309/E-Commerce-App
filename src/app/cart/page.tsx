"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/types/ProductType";
import CartProduct from "@/components/CartProduct";

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
        margin: "5rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cart.map((item) => {
        return <CartProduct product={item} key={item.id} />;
      })}
    </div>
  );
}
