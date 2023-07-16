import { useEffect, useReducer } from "react";
import { useAxios } from "../../contexts/axios-context";
import { reducer, initialState, fetching, success, error } from "../../reducers/api-reducer";

export const useGetAllRequest = (params) => {
  const [state, dispatch] = useReducer(reducer, {...initialState, data: []});
  const axiosInstance = useAxios();

  const fetchData = async () => {
    dispatch(fetching());
    try {
      const response = await axiosInstance.get("/requests", {params});
      dispatch(success(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return {data: state.data, status: state.status};
};
