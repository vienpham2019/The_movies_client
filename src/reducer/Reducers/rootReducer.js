import moviesReducer from "./moviesReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import movieInfoReducer from "./movieInfoReducer";

import { combineReducers } from "redux";

export default combineReducers({
  moviesReducer,
  userReducer,
  notificationReducer,
  movieInfoReducer,
});
