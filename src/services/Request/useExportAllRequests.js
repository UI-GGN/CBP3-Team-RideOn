import {useAxios} from "../../contexts/axios-context";
import { APIStatus} from "../../reducers/api-reducer";

export const useExportAllRequests = () => {
  const axiosInstance = useAxios();

  const fetchData = async (params) => {
    const {fromDate, tillDate} = params;
    const queryParams = {"start-date": fromDate, "end-date": tillDate};
    try {
      const response = await axiosInstance.get("/requests/export", {
        params: queryParams,
        responseType: 'blob',
      });
      return {response, status: APIStatus.SUCCESS};
    } catch (e) {
      return {status: APIStatus.error};
    }
  };

  return {fetchData};
};
