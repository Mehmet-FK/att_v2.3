import { toastErrorNotify } from "@/helpers/ToastNotify";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

const useAxios = () => {
  const BASE_URL = "https://apl.attensam.at";

  const { data: session, update: updateSession } = useSession();

  const retryAPICallAfterUnauthorizedResponse = async (
    error,
    axiosInstanceBase
  ) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!session) {
          throw new Error("Session not found");
        }

        const { token, refreshToken } = session.user;

        const { data } = await axios.post(
          "https://pro.attensam.at/atina/AtinaUsers/refresh",
          {
            accessToken: token,
            refreshToken: refreshToken,
          }
        );

        updateSession({
          ...session,
          user: {
            ...session.user,
            token: data?.accessToken,
            refreshToken: data?.refreshToken,
          },
        });

        // Retry the original request with the new token
        axiosInstanceBase.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return axiosInstanceBase(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        toastErrorNotify(
          "Ihre Sitzung ist abgelaufen, Sie werden zum Login weitergeleitet!"
        );
        setTimeout(() => {
          signIn();
        }, 1500);
      }
    }

    return Promise.reject(error);
  };

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${session.user?.token}`,
      Accept: "/*",
      "Content-Type": "application/json",
    },
  });

  const axiosFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${session.user?.token}`,
      Accept: "/*",
      "Content-Type": "multipart/from-data",
    },
  });

  const axiosTableDataPhase1 = axios.create({
    baseURL: "https://pro.attensam.at/atina/",
    headers: {
      Authorization: `Bearer ${session.user?.token}`,
      Accept: "/*",
      "Content-Type": "application/json",
    },
  });

  const axiosTableDataPhase2 = axios.create({
    baseURL: "https://apl.attensam.at/",
  });

  axiosWithToken.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) =>
      retryAPICallAfterUnauthorizedResponse(error, axiosWithToken)
  );
  axiosFormData.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) => retryAPICallAfterUnauthorizedResponse(error, axiosFormData)
  );
  axiosTableDataPhase1.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) =>
      retryAPICallAfterUnauthorizedResponse(error, axiosTableDataPhase1)
  );

  return {
    axiosInstance,
    axiosWithToken,
    axiosFormData,
    axiosTableDataPhase1,
    axiosTableDataPhase2,
  };
};

export default useAxios;
