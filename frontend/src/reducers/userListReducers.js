import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_RESET,
  USER_DEACTIVATE_FAIL,
  USER_DEACTIVATE_REQUEST,
  USER_DEACTIVATE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userListConstants";

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, userList: action.payload };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, userDetail: action.payload };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case USER_DETAIL_SUCCESS:
      return { ...state, loading: false, userDetail: action.payload };
    case USER_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAIL_RESET:
      return { ...state, loading: false, userDetail: null };

    case USER_DEACTIVATE_REQUEST:
      return { ...state, loading: true };
    case USER_DEACTIVATE_SUCCESS:
      return { ...state, loading: false, userDetail: null };
    case USER_DEACTIVATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
