import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { theme } from '../utils/theme';

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 50px 1fr;
  background: #0a0a12;
  padding: 0 1.5rem;
  border-top: 1px solid rgba(255, 137, 6, 0.2);

  .button-container {
    display: flex;
    align-items: center;
    
    .emoji {
      position: relative;
      
      svg {
        font-size: 1.6rem;
        color: #ff8906;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          color: #e53170;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(15, 14, 23, 0.7);
    padding: 0 1rem;
    
    input {
      width: 100%;
      height: 50px;
      background: transparent;
      color: #fffffe;
      border: none;
      padding: 0 1rem;
      font-size: 1rem;

      &::placeholder {
        color: #a7a9be;
      }
    }
    
    button {
      padding: 0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff8906;
      border: none;
      width: 40px;
      height: 40px;
      cursor: pointer;
      
      &:hover {
        background: #e53170;
      }
      
      svg {
        font-size: 1.4rem;
        color: #0f0e17;
      }
    }
  }
`;