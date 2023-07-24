const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_USER":
      const data = action.payload?.result
        ? action.payload.result
        : action.payload;
      return data;
    default:
      return state;
  }
};

export default currentUserReducer;

/**
 * * data: {
 * * token:string,
 * * result: userInfo
 * * }
 */
