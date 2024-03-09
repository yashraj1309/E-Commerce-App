"use client";
import React from "react";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";
import { Product } from "@/types/ProductType";
import axios from "axios";

import ProductCard from "@/components/ProductCard";

const getProductList = async (query: string) => {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  console.log(response);
  return response.data.products;
};

function SearchBarFallback() {
  return <>Error on our side please refresh and search again...</>;
}

function Searched() {
  const searchParams = useSearchParams();
  //   getting search requested by user : q is query param
  //example route : /search?q="iphone"

  const search = searchParams.has("q") ? searchParams.get("q") : "";
  console.log("search: " + search);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchItems = async (query: string) => {
      try {
        setLoading(true);
        const getProducts = await getProductList(query);
        setLoading(false);
        setProducts(getProducts);
      } catch (error) {
        console.error("Error fetching search items:", error);
      }
    };

    if (search) {
      fetchSearchItems(search);
    } else {
      setLoading(false);
    }
  }, [search]);

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "white",
        margin: "4.5rem 1rem 3rem 1rem",
        borderRadius: "4px",
      }}
    >
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {products.length === 0 && !loading
        ? "No Products available..."
        : !loading && (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-start",
                gap: "1.8rem",
                flexWrap: "wrap",
              }}
            >
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
    </div>
  );
}

export default function SearchBarComponent() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <Searched />
    </Suspense>
  );
}
