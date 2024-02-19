"use client"
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/types/ProductType";
import CartProduct from "@/components/CartProduct";

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const fetchCart = useSelector((state: RootState) => state.addToCart.value); //This is reducer name
  useEffect(()=>{
    if(fetchCart) {
        setCart((prev)=>fetchCart);
    }
  },[fetchCart]);
  return <div style={{ marginTop: "5rem", marginLeft: "5rem" }}>
    {
        cart.map((item)=> {
            return <CartProduct product={item} key={item.id}/>
        })
    }
  </div>;
}
