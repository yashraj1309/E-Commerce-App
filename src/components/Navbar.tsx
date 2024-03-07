"use client";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Product } from "@/types/ProductType";
import { logoutUser } from "@/redux/UserSlice";

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
  const user = useSelector((state: RootState) => state.user);
  const [cartSize, setCartSize] = useState(0);

  const dispatch = useDispatch();

  // console.log(user);

  useEffect(() => {
    if (cart) {
      setCartSize((prev) => calculateTotalQuantity(cart));
    }
  }, [cart]);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        paddingLeft: "10rem",
        backgroundColor: "white",
        paddingRight: "10rem",
        height: "50px",
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
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 8px",
                  }}
                >
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
                  <div style={{ marginBottom: "3px", marginLeft: "5px" }}>
                    {user.email === "" ? "Login" : "Welcome"}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user.email === "" && (
                    <>
                      <Dropdown.Item>
                        <Link href="/login" className="link">
                          Login
                        </Link>
                      </Dropdown.Item>
                      <hr style={{ margin: "5px 0px" }}></hr>
                      <Dropdown.Item>
                        <Link href="/signup" className="link">
                          Sign Up
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                  {user.email !== "" && (
                    <>
                      <Dropdown.Item href="/user">
                        <Link href="/user" className="link">
                          Profile
                        </Link>
                      </Dropdown.Item>
                      <hr style={{ margin: "5px 0px" }}></hr>
                      <Dropdown.Item>
                        <Link
                          href="javascript:void(0)"
                          className="link"
                          onClick={logoutHandler}
                        >
                          Logout {"->"}
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
