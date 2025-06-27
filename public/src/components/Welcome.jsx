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
  color: white;
  flex-direction: column;
  height: 100%;
  background: radial-gradient(circle at center, ${theme.dark} 0%, ${theme.darker} 100%);
  text-align: center;
  padding: 2rem;

  img {
    height: 18rem;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 20px rgba(93, 95, 239, 0.2));
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    background: linear-gradient(to right, ${theme.textPrimary}, ${theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span {
    color: ${theme.accent};
    font-weight: 600;
  }

  h3 {
    color: ${theme.textSecondary};
    font-weight: 400;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
`;