/* eslint-disable no-unused-vars */
import {useEffect, useReducer} from "react";
import {useAxios} from "../../contexts/axios-context";
import {reducer, fetching, success, error, APIStatus} from "../../reducers/api-reducer";

const initialState = {
  response: {
    data: [],
    metadata: {
      pageNumber: "1",
      limit: "10",
      total: 0,
    },
  },
  status: APIStatus.NONE,
};

export const useGetAllRequest = (params) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosInstance = useAxios();

  const fetchData = async () => {
    dispatch(fetching());
    try {
      const apiResponse = await axiosInstance.get("/requests", {params});
      dispatch(success(apiResponse.data));
    } catch (e) {
      dispatch(error(e));
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return {response: state.response, status: state.status};
};
