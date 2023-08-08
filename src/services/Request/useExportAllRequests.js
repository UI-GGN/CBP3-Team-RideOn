import { useReducer} from "react";
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

export const useExportAllRequests = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosInstance = useAxios();

  const fetchData = async (params) => {
    const {fromDate, tillDate} = params;
    console.log('fromDate', fromDate.toISOString());
    fromDate.setUTCHours(0, 0, 0, 0);
    fromDate.setUTCDate(fromDate.getUTCDate() + 1);
    tillDate.setUTCHours(23, 59, 59, 0);
    console.log('after', fromDate.toISOString());
    dispatch(fetching());
    try {
      const apiResponse = await axiosInstance.get("/requests", {params});
      console.log('data came as', apiResponse.data);
      dispatch(success(apiResponse.data.data));
    } catch (e) {
      dispatch(error(e));
    }
  };

  return {response: state.response, status: state.status, fetchData};
};
