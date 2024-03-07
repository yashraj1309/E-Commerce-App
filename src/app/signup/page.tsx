"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { addUser } from "@/redux/UserSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import "./signup.css";

function validateEmail(email: string) {
  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const initialUserValue = { email: "", password: "" };

export default function SignUp() {
  const [userData, setUserData] = useState(initialUserValue);
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });
  const [disabled, setDisabled] = useState(true);

  const inputHandler = (e: any) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "email" && !validateEmail(e.target.value)) {
      setErrors((prev) => ({
        ...prev,
        emailError: true,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        emailError: false,
      }));
    }
    if (e.target.name == "password" && e.target.value?.length < 8) {
      setErrors((prev) => ({
        ...prev,
        passwordError: true,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        passwordError: false,
      }));
    }
  };

  useEffect(() => {
    if (validateEmail(userData.email) && userData.password.length >= 8) {
      setDisabled((prev) => false);
    } else {
      setDisabled((prev) => true);
    }
  }, [userData]);

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser(userData));
    setUserData((user) => initialUserValue);
    router.push("/");
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "100px auto",
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "4px",
      }}
    >
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={inputHandler}
            value={userData.email}
          />
          {errors.emailError && (
            <div className="formError">Please enter valid email...</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            aria-describedby="passwordHelpBlock"
            onChange={inputHandler}
            value={userData.password}
          />

          {errors.passwordError && (
            <div className="formError">
              Password length should be greater than or equal to 8...
            </div>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%" }}
          disabled={disabled}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
