import {
  TIME_DETAIL_FAIL,
  TIME_DETAIL_REQUEST,
  TIME_DETAIL_RESET,
  TIME_DETAIL_SUCCESS,
  TIME_UPDATE_FAIL,
  TIME_UPDATE_REQUEST,
  TIME_UPDATE_SUCCESS,
} from "../constants/timeConstants";

export const timeReducer = (state = {}, action) => {
  switch (action.type) {
    case TIME_UPDATE_REQUEST:
      return { ...state, loading: true };
    case TIME_UPDATE_SUCCESS:
      return { ...state, loading: false };
    case TIME_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case TIME_DETAIL_REQUEST:
      return { ...state, loading: true };
    case TIME_DETAIL_SUCCESS:
      return { ...state, loading: false, jamKerja: action.payload };
    case TIME_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TIME_DETAIL_RESET:
      return { ...state, divisiDetail: null };
    default:
      return state;
  }
};
