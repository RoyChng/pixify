import { useReducer } from "react";

function httpReducer(state, action) {
  switch (action.type) {
    case "SEND":
      return {
        status: "pending",
        data: null,
        errorMessage: null,
      };
    case "COMPLETE":
      return {
        status: "completed",
        data: action.payload,
        errorMessage: null,
      };
    case "ERROR":
      return {
        status: "error",
        data: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

function useHttp(requestFunction) {
  const [state, dispatch] = useReducer(httpReducer, {
    status: "pending",
    data: null,
    errorMessage: null,
  });

  async function sendRequest(...args) {
    dispatch({ type: "SEND" });
    try {
      const data = await requestFunction(...args);
      dispatch({ type: "COMPLETE", payload: data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message || "Something went wrong",
      });
    }
  }

  return { sendRequest, ...state };
}

export default useHttp;
