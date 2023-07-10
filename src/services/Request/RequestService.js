import { useAxios } from "../../contexts/axios-context";

export const useCreateRequest = (params) => {
  const axiosInstance = useAxios();

  const createRequest = async (params) => {
    return axiosInstance.post("/requests", { params });
  };

  return createRequest;
};


const createRequest = async (params) => {
  return axiosInstance.post("/requests", { params });
};
