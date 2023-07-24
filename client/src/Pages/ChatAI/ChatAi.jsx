import React, { useEffect, useRef } from "react";

import "./ChatAI.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { ChatAiInput } from "../../components/ChatAI/ChatAiInput";
import { ChatViewer } from "../../components/ChatAI/ChatViewer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useScrollToBottom } from "../../hook/useScrollToBottom";
export const ChatAI = () => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const isNavigate = useRef(false);

  const { scrollToBottom, showDownBtn } = useScrollToBottom();

  useEffect(() => {
    console.log(currentUser, "chat");
    if (!currentUser && !isNavigate.current) {
      isNavigate.current = true;
      navigate("/auth");
      alert("login to access Chat AI");
    }
    console.log(currentUser);
  }, [navigate, currentUser]);

  useEffect(() => {
    if (currentUser && !currentUser.verified) {
      navigate("/verify");
    }
  }, [currentUser, navigate]);

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1>Chat AI</h1>
        <div className="chat-container">
          <div className="chat-message-container">
            <ChatViewer />
          </div>
          <ChatAiInput />

          <div
            className="go-down-container"
            onClick={() => scrollToBottom()}
            data-show-scroll-to-down={showDownBtn}
          >
            <div className="icon-position">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
