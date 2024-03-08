"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const getProductList = async (query: string) => {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  console.log(response);
  return response.data.products;
};

export default function Searched() {
  const searchParams = useSearchParams();
  //   getting search requested by user : q is query param
  const search = searchParams.get("q");
  console.log("search: "+search);

  const [products, setProducts] = useState([]);
  const [noProductFound, setNoProductFount] = useState(false);

   useEffect(() => {
     const fetchSearchItems = async (query: string) => {
       try {
         const getProducts = await getProductList(query);
         setProducts(getProducts);
       } catch (error) {
         console.error("Error fetching search items:", error);
       }
     };

     if (search) {
       fetchSearchItems(search);
     }
   }, [search]);

  return <div className="m-5">{(products.length === 0 && noProductFound)? "Loading..." : products.length}</div>;
}
