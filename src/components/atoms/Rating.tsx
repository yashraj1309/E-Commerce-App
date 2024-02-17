"use client"
import React from "react";
export default function Rating(props: { rating: number; stock: number }) {
  return (
    <div
      className="d-flex align-items-center"
      style={{ fontSize: "14px", marginBottom: ".5rem" }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: "12px",
          borderRadius: "3px",
          fontWeight: "500",
          backgroundColor: "#388e3c",
          display: "flex",
          alignItems: "center",
          gap: "3px",
          padding: "2px 4px 2px 6px",
          width: "fit-content",
        }}
      >
        {props.rating?.toFixed(1)}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          fill="#fff"
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      </span>
      &nbsp; ({props.stock})
    </div>
  );
}
