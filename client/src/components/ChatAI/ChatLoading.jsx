import React from "react";

export const ChatLoading = () => {
  return (
    <div className="chat-empty-con">
      <div className="chat-empty-sub-con">
        <h4>Loading for you </h4>
        <p>{`getting your chat, please wait...`}</p>
      </div>
    </div>
  );
};
