import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { theme } from '../utils/theme';
import defaultAvatar from "../assets/default-avatar.svg"
export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 90px;
  gap: 0;
  overflow: hidden;
  background: ${theme.dark};
  position: relative;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: ${theme.darker};
    border-bottom: 1px solid ${theme.stroke};

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 2.8rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid ${theme.primary};
        }
      }

      .username {
        h3 {
          color: ${theme.textPrimary};
          font-weight: 500;
        }
      }
    }
  }

  .chat-messages {
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background: ${theme.dark};

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 60%;
        overflow-wrap: break-word;
        padding: 0.8rem 1.2rem;
        font-size: 0.95rem;
        border-radius: 1rem;
        line-height: 1.4;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background: ${theme.primary};
        color: white;
        border-top-right-radius: 0.2rem;
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background: ${theme.darker};
        color: ${theme.textPrimary};
        border: 1px solid ${theme.stroke};
        border-top-left-radius: 0.2rem;
      }
    }
  }
`;