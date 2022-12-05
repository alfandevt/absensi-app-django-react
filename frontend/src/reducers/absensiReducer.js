import {
  ABSENSI_LIST_REQUEST,
  ABSENSI_LIST_SUCCESS,
  ABSENSI_LIST_FAIL,
  ABSENSI_CREATE_REQUEST,
  ABSENSI_CREATE_SUCCESS,
  ABSENSI_CREATE_FAIL,
  ABSENSI_COUNT_REQUEST,
  ABSENSI_COUNT_SUCCESS,
  ABSENSI_COUNT_FAIL,
  ABSENSI_DETAIL_REQUEST,
  ABSENSI_DETAIL_SUCCESS,
  ABSENSI_DETAIL_FAIL,
  ABSENSI_DETAIL_RESET,
} from "../constants/absensiConstants";

export const absensiReducer = (state = { absensiDetail: [], }, action) => {
  switch (action.type) {
    case ABSENSI_LIST_REQUEST:
      return { ...state, loading: true };
    case ABSENSI_LIST_SUCCESS:
      return { ...state, loading: false, absensiList: action.payload };
    case ABSENSI_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ABSENSI_CREATE_REQUEST:
      return { ...state, loading: true };
    case ABSENSI_CREATE_SUCCESS:
      return { ...state, loading: false, absen: action.payload };
    case ABSENSI_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ABSENSI_COUNT_REQUEST:
      return { ...state, loading: true };
    case ABSENSI_COUNT_SUCCESS:
      return { ...state, loading: false, absenCount: action.payload };
    case ABSENSI_COUNT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ABSENSI_DETAIL_REQUEST:
      return { ...state, loading: true };
    case ABSENSI_DETAIL_SUCCESS:
      return { ...state, loading: false, absensiDetail: action.payload };
    case ABSENSI_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ABSENSI_DETAIL_RESET:
      return { ...state, absensiDetail: [] };
    default:
      return state;
  }
};
