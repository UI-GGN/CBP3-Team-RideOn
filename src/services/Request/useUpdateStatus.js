import {useAxios} from "../../contexts/axios-context";
import {APIStatus} from "../../reducers/api-reducer";

export const useUpdateStatus = () => {
  const axiosInstance = useAxios();

  const updateStatus = async (requestId, body) => {
    try {
      await axiosInstance.post(
        `/requests/${requestId}/updateStatus`,
        body
      );
      return APIStatus.SUCCESS;
    } catch (e) {
      return APIStatus.FAILED;
    }
  };

  return {updateStatus};
};
