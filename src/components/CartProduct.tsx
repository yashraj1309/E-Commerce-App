import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Rating from "./atoms/Rating";

import { Product } from "@/types/ProductType";
import Price from "./atoms/Price";

export default function CartProduct({ product }: { product: Product }) {
  return (
    <Card
      style={{ width: "40rem", flexDirection: "row" }}
      className="product-card-main"
      key={product.id}
    >
      <Link href={`/products/${product.id}`} prefetch={true}>
        <Card.Img
          variant="top"
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
        </Link>
        <Card.Text
          style={{
            maxHeight: "7.2em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
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
      </Card.Body>
    </Card>
  );
}
