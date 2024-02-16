import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Rating from "./atoms/Rating";

import { Product } from "@/types/ProductType";

const discountConvertor = (x: number, y: number) => {
  x = x + (x * y) / 100;
  return x.toFixed(2);
};

export default function ProductCard({ product }: { product: Product }) {
  let originalPrice = discountConvertor(
    product.price,
    product.discountPercentage
  );
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={product.thumbnail}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          maxHeight: "190px",
          minHeight: "190px",
          borderBottom: "1px solid gainsboro",
        }}
      />
      <Card.Body>
        <Card.Title
          style={{
            maxHeight: "3.6em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {product.title}
        </Card.Title>
        <Card.Text
          style={{
            maxHeight: "7.2em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {product.description}
        </Card.Text>
        <Rating rating={product.rating} stock={product.stock} />
        <Card.Text
          className="d-flex align-items-center"
          style={{ gap: ".2rem" }}
        >
          <b>${product.price}</b> &nbsp;{" "}
          <span
            style={{
              textDecoration: "line-through",
              color: "#878787",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {" "}
            {originalPrice}{" "}
          </span>{" "}
          &nbsp;{" "}
          <span
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "#388e3c",
              letterSpacing: "-.2px",
            }}
          >
            {product.discountPercentage}% off
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
