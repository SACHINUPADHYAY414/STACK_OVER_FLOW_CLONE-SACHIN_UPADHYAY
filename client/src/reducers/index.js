import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";
import chatReducer from "./chat";
import errorReducer from "./error";
import loadingReducer from "./loading";
import socialReducer from "./social";
import subscriptionReducer from "./subscription";

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  usersReducer,
  chatReducer,
  errorReducer,
  loadingReducer,
  socialReducer,
  subscriptionReducer,
});
