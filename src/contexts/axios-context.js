import { createContext, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const axiosContext = createContext();
export const useAxios = () => useContext(axiosContext);

export const AxiosProvider = ({children}) => {
  let token;
  const {getAccessTokenSilently} = useAuth0();
  const axiosInstance = axios.create({
    baseURL: "https://rideon-service.vercel.app", // env var
  });

  axiosInstance.interceptors.request.use(async (config) => {
    token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  console.log("type of", typeof axiosInstance);
  return (<axiosContext.Provider value={{axiosInstance}}>
    {children}
  </axiosContext.Provider>);
};
