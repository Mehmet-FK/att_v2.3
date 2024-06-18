import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const BASE_URL = "https://apl.attensam.at/api/";

  const { token } = useSelector((state) => state.settings.user);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "/*",
      "Content-Type": "application/json",
    },
  });

  const axiosFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "/*",
      "Content-Type": "multipart/from-data",
    },
  });

  const axiosTableData = axios.create({
    baseURL: "https://pro.attensam.at/atina/",
  });

  // axiosFormWithToken.defaults.headers.common["Content-Type"] =
  //   "multipart/from-data";

  return { axiosInstance, axiosWithToken, axiosFormData, axiosTableData };
};

export default useAxios;
