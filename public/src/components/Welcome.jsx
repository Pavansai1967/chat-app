import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { theme } from '../utils/theme';
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background: ${theme.dark};
  text-align: center;
  padding: 2rem;

  img {
    height: 18rem;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 20px rgba(211, 47, 47, 0.1));
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${theme.textPrimary};
  }

  span {
    color: ${theme.primary};
    font-weight: 600;
  }

  h3 {
    color: ${theme.paragraph};
    font-weight: 400;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
`;