"use client";
import React from "react";
import { fetchProducts } from "@/app/api";
import { useState, useEffect } from "react";
import { Product } from "@/types/ProductType";
import Spinner from "react-bootstrap/Spinner";
import ProductCard from "./ProductCard";
import Pagination from "react-bootstrap/Pagination";

export default function ProductListMain() {
  const CARDS_VISIBLE_PER_PAGE = 12;
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [paginationButtons, setPaginationButtons] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setVisibleProducts(productsData.slice(0, CARDS_VISIBLE_PER_PAGE));
      const totalPages = Math.ceil(
        productsData.length / CARDS_VISIBLE_PER_PAGE
      );
      setPaginationButtons(totalPages);
    };
    fetchData();
  }, []);

  useEffect(() => {}, [visibleProducts]);

  const sliceArray = (x: number) => {
    if (x === 1) {
      setVisibleProducts((prev) => products.slice(0, CARDS_VISIBLE_PER_PAGE));
    } else {
      const startIndex = (x - 1) * CARDS_VISIBLE_PER_PAGE;
      const endIndex = startIndex + CARDS_VISIBLE_PER_PAGE;
      setVisibleProducts(products.slice(startIndex, endIndex));
    }
    setCurrentPage((prev) => x);
  };
  return (
    <div className="p-5" style={{ marginTop: "1.5rem" }}>
      {visibleProducts.length === 0 ? (
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {visibleProducts.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          <Pagination className="justify-content-center mt-4">
            <Pagination.First onClick={() => sliceArray(1)} />
            <Pagination.Prev
              onClick={() => {
                if (currentPage === 1) {
                  return;
                } else {
                  sliceArray(currentPage - 1);
                  setCurrentPage((prev) => currentPage - 1);
                }
              }}
            />
            {Array.from({ length: paginationButtons }).map((_, index) => (
              <Pagination.Item
                key={index + 1} // Use a unique key for each item
                active={currentPage === index + 1} // Check if current page matches the index
                onClick={() => sliceArray(index + 1)} // Pass the index as the page number
              >
                {index + 1} {/* Display the page number */}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => {
                if (currentPage === 9) {
                  return;
                } else {
                  sliceArray(currentPage + 1);
                  setCurrentPage((prev) => currentPage + 1);
                }
              }}
            />
            <Pagination.Last onClick={() => sliceArray(9)} />
          </Pagination>
        </>
      )}
    </div>
  );
}
