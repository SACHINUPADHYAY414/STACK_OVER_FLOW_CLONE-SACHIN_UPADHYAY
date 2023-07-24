import * as api from "../api";
export const postChat = (prompt) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_ERROR" });
    dispatch({ type: "CHAT_START_LOADING" });
    const { data } = await api.postChat(prompt);
    console.log(data, "chat ");

    dispatch({ type: "FETCH_CHAT", payload: data.chat.chat });
  } catch (error) {
    dispatch({ type: "CHAT_END_LOADING" });
    const err = { success: false, message: "something went wrong, try again" };
    dispatch({ type: "SET_ERROR", payload: err });
  }
};

export const fetchChat = () => async (dispatch) => {
  try {
    dispatch({ type: "RESET_ERROR" });
    dispatch({ type: "CHAT_START_LOADING" });
    const { data } = await api.getChat();
    const { chat } = data.chat;
    console.log(chat, "chat ");
    dispatch({ type: "FETCH_CHAT", payload: chat });
  } catch (error) {
    dispatch({ type: "CHAT_END_LOADING" });
    const err = { success: false, message: "something went wrong, try again" };
    dispatch({ type: "SET_ERROR", payload: err });
  }
};
