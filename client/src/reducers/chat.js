const chatReducer = (states = {}, action) => {
  switch (action.type) {
    case "CHAT_START_LOADING":
      return { ...states, isLoading: true };
    case "CHAT_END_LOADING":
      return { ...states, isLoading: false };
    case "FETCH_CHAT":
      return { isLoading: false, chat: action.payload };
    default:
      return states;
  }
};

export default chatReducer;
