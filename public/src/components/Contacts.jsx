import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { theme } from '../utils/theme';

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>NexChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 100px;
  overflow: hidden;
  background: #0a0a12;
  border-right: 1px solid #ff8906;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 137, 6, 0.2);
    
    img {
      height: 2.2rem;
    }
    
    h3 {
      color: #fffffe;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    
    .contact {
      background: rgba(15, 14, 23, 0.5);
      min-height: 70px;
      cursor: pointer;
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.8rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: all 0.2s ease;
      border: 1px solid transparent;

      &:hover {
        background: rgba(255, 137, 6, 0.1);
        border-color: rgba(255, 137, 6, 0.2);
      }

      .avatar img {
        height: 2.8rem;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #ff8906;
      }

      .username h3 {
        color: #fffffe;
        font-weight: 500;
      }
    }

    .selected {
      background: rgba(255, 137, 6, 0.2);
      border: 1px solid #ff8906;
    }
  }

  .current-user {
    background: #0f0e17;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid rgba(255, 137, 6, 0.2);

    .avatar img {
      height: 3.2rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #e53170;
    }

    .username h2 {
      color: #fffffe;
      font-size: 1.1rem;
    }
  }
`;