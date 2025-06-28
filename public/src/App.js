import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import styled from 'styled-components';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}


const BrowseRouter = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  .contacts-container {
    width: 30%;
    min-width: 300px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .chat-container {
    width: 70%;
    @media screen and (max-width: 768px) {
      display: ${({ currentChat }) => (currentChat ? 'flex' : 'none')};
      width: 100%;
    }
  }
`;
