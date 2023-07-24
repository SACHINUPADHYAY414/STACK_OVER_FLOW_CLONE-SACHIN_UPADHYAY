const subscriptionReducer = (states = { isPaid: false }, action) => {
  switch (action.type) {
    case "SET_IS_PAID":
      return { isPaid: action.payload };
    default:
      return states;
  }
};

export default subscriptionReducer;
