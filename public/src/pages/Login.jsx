import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import { theme } from '../utils/theme';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>NexChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0f0e17;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    
    img {
      height: 4rem;
    }
    
    h1 {
      color: #fffffe;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      font-size: 2.2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: rgba(15, 14, 23, 0.9);
    border-radius: 1rem;
    padding: 2.5rem;
    width: 380px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid #ff8906;
  }

  input {
    background-color: rgba(10, 10, 18, 0.8);
    padding: 1rem;
    border: 1px solid #ff8906;
    border-radius: 0.5rem;
    color: #fffffe;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border: 1px solid #f25f4c;
      outline: none;
      box-shadow: 0 0 0 3px rgba(242, 95, 76, 0.2);
    }
  }

  button {
    background: #ff8906;
    color: #0f0e17;
    padding: 1rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: all 0.3s ease;
    margin-top: 0.5rem;

    &:hover {
      background: #e53170;
      color: #fffffe;
    }
  }

  span {
    color: #a7a9be;
    text-align: center;
    font-size: 0.9rem;

    a {
      color: #ff8906;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        color: #f25f4c;
        text-decoration: underline;
      }
    }
  }
`;