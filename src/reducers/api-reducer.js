export const APIStatus = {
  NONE: "none",
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
};

export const initialState = {
  data: null,
  status: APIStatus.NONE,
};

const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const FETCHING = "FETCHING";
const SUCCESS_NO_CONTENT = "SUCCESS_NO_CONTENT";

export const fetching = () => {
  return {type: FETCHING};
};
export const success = (data) => {
  return {type: SUCCESS, payload: data};
};
export const error = (e) => {
  return {type: ERROR, payload: e};
};
export const successNoContent = () => {
  return {type: SUCCESS_NO_CONTENT};
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCHING: {
      return {...state, status: APIStatus.LOADING};
    }
    case SUCCESS: {
      return {...state, data: action.payload, status: APIStatus.SUCCESS};
    }
    case ERROR: {
      return {...state, status: APIStatus.FAILED};
    }
    case SUCCESS_NO_CONTENT: {
      return {...state, status: APIStatus.SUCCESS};
    }
    default: {
      return state;
    }
  }
};
