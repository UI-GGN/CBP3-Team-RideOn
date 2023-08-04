import { useReducer } from "react";
import { useAxios } from "../../contexts/axios-context";
import { reducer, successNoContent, error, APIStatus } from "../../reducers/api-reducer";

const initialState = {
  data: [],
  status: APIStatus.NONE
};

export const useUpdateStatus = () => {
  const [state, dispatch] = useReducer(reducer, {...initialState});
  const axiosInstance = useAxios();

  const updateStatus = async (requestId, body) => {
    try {
      const response = await axiosInstance.post(`/requests/${requestId}/updateStatus`, body);
      if (response.status === 204) {
        dispatch(successNoContent());
      }
    } catch (e) {
      dispatch(error(e));
    }
  };

  return {apiStatus: state.status, updateStatus};
};
