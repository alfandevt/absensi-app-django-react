import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducers";
import { divisiReducer } from "./reducers/divisiReducers";
import { userListReducer } from "./reducers/userListReducers";
import { timeReducer } from "./reducers/timeReducers";
import { absensiReducer } from "./reducers/absensiReducer";

const reducer = combineReducers({
  user: userReducer,
  users: userListReducer,
  divisi: divisiReducer,
  jam: timeReducer,
  absensi: absensiReducer,
});

const middleware = [thunk];

const tokenFromStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const absenTodayFromStorage = localStorage.getItem("absen")
  ? JSON.parse(localStorage.getItem("absen"))
  : null;

const initialState = {
  user: {
    profile: userInfoFromStorage,
    token: tokenFromStorage,
  },
  absensi: {
    absen: absenTodayFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
