const loadingReducer = (states = {}, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { loading: true, location: window.location.href };
    case "END_LOADING":
      return { loading: false, location: window.location.href };
    default:
      return states;
  }
};

export default loadingReducer;

/**
 * *   {
 * * loading:boolean,
 * * location : string
 * ? ^^^^^^^^ current window location herf
 * * }
 */
