import React from 'react'
import Card from "react-bootstrap/Card";

interface propsTypes {
    price: number;
    discountPercentage: number;
}

const discountConvertor = (x: number, y: number) => {
  x = x + (x * y) / 100;
  return x.toFixed(2);
};

export default function Price(props: propsTypes) {
     let originalPrice = discountConvertor(
       props.price,
       props.discountPercentage
     );
  return (
    <Card.Text className="d-flex align-items-center" style={{ gap: ".2rem" }}>
      <b>${props.price}</b> &nbsp;{" "}
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
        {props.discountPercentage}% off
      </span>
    </Card.Text>
  );
}
