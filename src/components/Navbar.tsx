"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Product } from "@/types/ProductType";

// Function to calculate total quantity of products
function calculateTotalQuantity(products: Product[]): number {
  let totalQuantity = 0;
  for (const product of products) {
    totalQuantity += product.quantity;
  }
  return totalQuantity;
}

function NavbarMain() {
  const cart = useSelector((state: RootState) => state.addToCart.value); //This is reducer name
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    if (cart) {
      setCartSize((prev) => calculateTotalQuantity(cart));
    }
  }, [cart]);
  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        paddingLeft: "10rem",
        backgroundColor: "white",
        paddingRight: "10rem",
        height: '50px'
      }}
    >
      <Container>
        <Link href="/" className="link">
          <Navbar.Brand>
            <b>AMAZONA</b>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="d-flex justify-content-end">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center" style={{ gap: "1rem" }}>
              <Link href="/" className="link nav-link-text">
                Home
              </Link>
              <Link href="/cart" className="link nav-link-text">
                Cart&nbsp;{cartSize}
              </Link>
              <Link href="#profile" className="link nav-link-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                  style={{ marginBottom: "2px" }}
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
