import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { theme } from '../utils/theme';
import defaultAvatar from '../assets/default-avatar.svg'; // Add a default avatar fallback

export default function Contacts({ contacts, changeChat }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if (data) {
          setCurrentUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const getAvatarSrc = (image) => {
    if (!image) return defaultAvatar;
    try {
      return `data:image/svg+xml;base64,${image}`;
    } catch {
      return defaultAvatar;
    }
  };

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>NexChat</h3>
      </div>

      <div className="contacts">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">
              <img
                src={getAvatarSrc(contact.avatarImage)}
                alt={contact.username}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
            </div>
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>

      {currentUser && (
        <div className="current-user">
          <div className="avatar">
            <img
              src={getAvatarSrc(currentUser.avatarImage)}
              alt={currentUser.username}
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
          </div>
          <div className="username">
            <h2>{currentUser.username}</h2>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 100px;
  overflow: hidden;
  background: ${theme.darker};
  border-right: 1px solid ${theme.stroke};

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid ${theme.stroke};
    
    img {
      height: 2.2rem;
    }
    
    h3 {
      color: ${theme.textPrimary};
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
      background: ${theme.dark};
      min-height: 70px;
      cursor: pointer;
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.8rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: all 0.2s ease;
      border: 1px solid ${theme.stroke};

      &:hover {
        background: rgba(211, 47, 47, 0.05);
        border-color: ${theme.primary};
      }

      .avatar img {
        height: 2.8rem;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid ${theme.primary};
      }

      .username h3 {
        color: ${theme.textPrimary};
        font-weight: 500;
      }
    }

    .selected {
      background: rgba(211, 47, 47, 0.1);
      border: 1px solid ${theme.primary};
    }
  }

  .current-user {
    background: ${theme.dark};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid ${theme.stroke};

    .avatar img {
      height: 3.2rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid ${theme.tertiary};
    }

    .username h2 {
      color: ${theme.textPrimary};
      font-size: 1.1rem;
    }
  }
`;