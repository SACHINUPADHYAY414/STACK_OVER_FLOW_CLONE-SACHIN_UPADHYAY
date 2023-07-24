const errorReducer = (states = {}, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    case "RESET_ERROR":
      return { success: false, message: "" };
    default:
      return states;
  }
};

export default errorReducer;

/**
 * *   {
 * * success:boolean,
 * * message: string
 * * location : string
 * ? ^^^^^^^^ current window location herf
 * * }
 */
