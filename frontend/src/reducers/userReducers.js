import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_ME_REQUEST,
  USER_ME_SUCCESS,
  USER_ME_FAIL,
  USER_UPDATE_ME_PROFILE_REQUEST,
  USER_UPDATE_ME_PROFILE_SUCCESS,
  USER_UPDATE_ME_PROFILE_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    // LOGIN
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        profile: action.payload.user,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, token: null, profile: null };

    // DETAIL
    case USER_ME_REQUEST:
      return { ...state, loading: true };

    case USER_ME_SUCCESS:
      return { ...state, loading: false, profile: action.payload };

    case USER_ME_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_UPDATE_ME_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_ME_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };

    case USER_UPDATE_ME_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
