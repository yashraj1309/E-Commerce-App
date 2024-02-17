"use client";
import { Product } from "@/types/ProductType";
import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { fetchProducts } from "@/app/api";

export default function ProductSubCard({ params }: { params: { id: string } }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  //setting the current product
  const [product, setProduct] = useState<Product>();

  //getting the product from its id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let products = await fetchProducts();
        let getProductById = products.find(
          (item) => item.id === parseInt(params.id)
        );
        if (getProductById) {
          setProduct((prev) => getProductById);
        }
        console.log(products);
        console.log(params.id);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchData();
  }, []);

  console.log(product);
  return (
    <div style={{ background: "gray" }}>
      {product ? (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          style={{ width: "500px" }}
        >
          {product?.images?.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  src={item}
                  alt=""
                  style={{
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
