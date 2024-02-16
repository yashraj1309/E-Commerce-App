"use client";
import React from "react";
import { fetchProducts } from "@/app/api";
import { useState, useEffect } from "react";
import { Product } from "@/types/ProductType";
import Spinner from "react-bootstrap/Spinner";
import ProductCard from "./ProductCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ProductListMain() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);
  return (
    <div className="p-5" style={{marginTop: '1.5rem'}}>
      {products.length === 0 ? (
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
