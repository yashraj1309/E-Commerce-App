"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import "./SearchForm.css";

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const searchFormSubmitHandler = (e: any) => {
    e.preventDefault();
    query!=="" && router.push(`/search?q=${query}`);
  };
  return (
    <div className="search-form">
      <Form onSubmit={searchFormSubmitHandler}>
        <Form.Control
          type="text"
          placeholder="iPhone X"
          className="search-form-input"
          style={{ paddingRight: "35px", width: "500px" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="#86b7fe"
        className="bi bi-search search-form-search_btn"
        viewBox="0 0 16 16"
        onClick={searchFormSubmitHandler}
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    </div>
  );
}
