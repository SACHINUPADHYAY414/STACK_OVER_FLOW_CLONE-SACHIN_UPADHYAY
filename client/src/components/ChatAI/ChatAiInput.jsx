import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { postChat } from "../../actions/chat";
export const ChatAiInput = () => {
  const [value, setValue] = useState("");
  const [btnValue, setBtnValue] = useState("send");
  const chatAi = useSelector((state) => state.chatReducer);
  const error = useSelector((state) => state.errorReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(postChat(value));
    console.log(value, "value");
  };

  useEffect(() => {
    console.log(error, "error");
  }, [error]);

  useEffect(() => {
    const value =
      chatAi.isLoading && !error.message
        ? "loading..."
        : error.message
        ? "try again"
        : "send";

    setBtnValue(value);

    if (!error.message && !chatAi.isLoading) {
      setValue("");
    }
  }, [chatAi.isLoading, error.message]);

  return (
    <div className="chat-input-container">
      <TextareaAutosize
        className="chatai-textarea"
        cacheMeasurements
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button className="chat-button" onClick={handleSubmit}>
        {btnValue}
      </button>
    </div>
  );
};
