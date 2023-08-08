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

export const useGetVendorsForModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosInstance = useAxios();
  const params = {"page-number": 1, limit: 100};

  const fetchVendors = async () => {
    dispatch(fetching());
    try {
      const response = await axiosInstance.get("/vendors", {params});
      dispatch(success(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return {status: state.status, data: state.response};
};
