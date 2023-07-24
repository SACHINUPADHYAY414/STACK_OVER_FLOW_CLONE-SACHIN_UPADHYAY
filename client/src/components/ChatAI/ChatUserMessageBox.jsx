import React from "react";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
export const ChatUserMessageBox = ({ message }) => {
  const currentUser = useSelector((state) => state.currentUserReducer);

  return (
    <div className="chat-message-box">
      <div className="w-10">
        <Avatar classname={"avatar-user-nav"}>
          {currentUser ? currentUser.name[0] : ":("}
        </Avatar>
      </div>
      <p className="message-box">{message}</p>
    </div>
  );
};
