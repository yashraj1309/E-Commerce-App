"use client";
import { Product } from "@/types/ProductType";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./productSub.css";
import Spinner from "react-bootstrap/Spinner";
import Price from "@/components/atoms/Price";
import Rating from "@/components/atoms/Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/CartSlice";
import Image from "next/image";

export default function ProductSubCard({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  //setting the current product
  const [product, setProduct] = useState<Product | null>(null);
  //getting the product from its id;
  useEffect(() => {
    //
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${params.id}`
        );
        setProduct((prev) => response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // Handle error by setting product to null
      }
    };
    fetchProduct();
  }, [params.id]);

  // Render loading state if product is still being fetched
  if (!product) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // dispatch : add product to cart
  const addToCartHandler = () => {
    dispatch(addToCart({...product,quantity: 1}));
  };
  return (
    <div style={{ marginTop: "5rem" }} key={product.id}>
      <div className="sub-product-main">
        <div className="sub-product-main-container">
          {product.images.map((item) => {
            return (
              <Image
                src={item}
                alt={product.title}
                style={{
                  height: "250px",
                  width: "100%",
                  margin: "0 auto",
                  display: "block",
                  objectFit: "contain",
                  marginBottom: ".5rem",
                  paddingBottom: ".5rem",
                }}
                width={1000}
                height={2500}
                key={item}
              />
            );
          })}
        </div>
        <div className="sub-product-main-container sticky-card">
          <h6 style={{ color: "#878787" }}>
            Category {">"} {product.category}
          </h6>
          <h5
            style={{
              color: "#878787",
              fontWeight: "500",
              fontSize: "18px",
              textTransform: "uppercase",
            }}
          >
            {product.brand}
          </h5>
          <h4 style={{ color: "#212121" }}>{product.title}</h4>
          <p>{product.description}</p>
          <Rating rating={product.rating} stock={product.stock} />
          <Price
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <button
            type="button"
            className="btn btn-primary custom-btn-product"
            style={{ marginRight: "8px" }}
            onClick={addToCartHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-plus-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
            </svg>
            &nbsp;
            <span>ADD TO CART</span>
          </button>
          <button type="button" className="btn btn-success custom-btn-product">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lightning-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
            </svg>
            <span>BUY NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
