import {
  DIVISI_LIST_REQUEST,
  DIVISI_LIST_SUCCESS,
  DIVISI_LIST_FAIL,
  DIVISI_CREATE_REQUEST,
  DIVISI_CREATE_SUCCESS,
  DIVISI_CREATE_FAIL,
  DIVISI_UPDATE_REQUEST,
  DIVISI_UPDATE_SUCCESS,
  DIVISI_UPDATE_FAIL,
  DIVISI_DETAIL_REQUEST,
  DIVISI_DETAIL_SUCCESS,
  DIVISI_DETAIL_FAIL,
  DIVISI_DETAIL_RESET,
} from "../constants/divisiConstants";

export const divisiReducer = (state = {}, action) => {
  switch (action.type) {
    case DIVISI_LIST_REQUEST:
      return { ...state, loading: true };
    case DIVISI_LIST_SUCCESS:
      return { ...state, loading: false, divisiList: action.payload };
    case DIVISI_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DIVISI_CREATE_REQUEST:
      return { ...state, loading: true };
    case DIVISI_CREATE_SUCCESS:
      return { ...state, loading: false };
    case DIVISI_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DIVISI_UPDATE_REQUEST:
      return { ...state, loading: true };
    case DIVISI_UPDATE_SUCCESS:
      return { ...state, loading: false };
    case DIVISI_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DIVISI_DETAIL_REQUEST:
      return { ...state, loading: true };
    case DIVISI_DETAIL_SUCCESS:
      return { ...state, loading: false, divisiDetail: action.payload };
    case DIVISI_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DIVISI_DETAIL_RESET:
      return { ...state, divisiDetail: null };
    default:
      return state;
  }
};
