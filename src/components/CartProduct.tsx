import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Rating from "./atoms/Rating";

import { Product } from "@/types/ProductType";
import "./CartProduct.css";
import Price from "./atoms/Price";

import { removeFromCart, addToCart } from "@/redux/CartSlice";
import { useDispatch } from "react-redux";

export default function CartProduct({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const removeCartHandler = () => {
    dispatch(removeFromCart(product));
  }
  const addToCartHandler = () => {
    dispatch(addToCart(product));
  }
  return (
    <Card
      style={{ width: "38rem", flexDirection: "row", padding: "1rem" }}
      className="product-card-main"
      key={product.id}
    >
      <Link
        href={`/products/${product.id}`}
        prefetch={true}
        className="d-flex align-items-center"
      >
        <Card.Img
          src={product.thumbnail}
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
          }}
        />
      </Link>
      <Card.Body>
        <Link
          href={`/products/${product.id}`}
          prefetch={true}
          className="title-link"
        >
          <Card.Title
            // style={{
            //   maxHeight: "3.6em",
            //   overflow: "hidden",
            //   textOverflow: "ellipsis",
            //   display: "-webkit-box",
            //   WebkitBoxOrient: "vertical",
            //   WebkitLineClamp: 1,
            // }}
          >
            {product.title}
          </Card.Title>
        </Link>
        <Card.Text
          style={{
            // maxHeight: "7.2em",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // display: "-webkit-box",
            // WebkitBoxOrient: "vertical",
            // WebkitLineClamp: 2,
            opacity: "0.9",
          }}
        >
          {product.description}
        </Card.Text>
        <Rating rating={product.rating} stock={product.stock} />
        <Price
          price={product.price}
          discountPercentage={product.discountPercentage}
        />
        <button
          type="button"
          className="btn btn-primary custom-btn-product-cart"
        >
          {product.quantity <= 1 ? (
            <span onClick={removeCartHandler}>REMOVE FROM CART</span>
          ) : (
            <div>
              {/* Remove Cart */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
                onClick={removeCartHandler}
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
              {/* Quantity */}
              <span>{product.quantity}</span>

              {/* Add to Cart */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
                onClick={addToCartHandler}
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
          )}
        </button>
      </Card.Body>
    </Card>
  );
}
