import { createContext, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Config from "../config/config";

export const AxiosContext = createContext();
export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({children}) => {
  let token;
  const {getAccessTokenSilently} = useAuth0();
  const axiosInstance = axios.create({
    baseURL: Config.BASE_URL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return (<AxiosContext.Provider value={axiosInstance}>
    {children}
  </AxiosContext.Provider>);
};
