import { toastSessionUpdateNotify } from "@/helpers/ToastNotify";
import { setSessionExpired } from "@/redux/slices/settingsSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const useAxios = () => {
  const { data: session, update: updateSession } = useSession();
  const { environment } = session.user;
  const BASE_URL = `https://${environment}`;

  const isRefreshingRef = useRef(false);
  const refreshSubscribersRef = useRef([]);

  const dispatch = useDispatch();

  const callRefreshSubscribers = (subscribers, token) => {
    subscribers.forEach((callback) => callback(token));
  };

  const addRefreshSubscriber = (callback) => {
    refreshSubscribersRef.current.push(callback);
  };

  const refreshTokenCall = async (token, refreshToken) => {
    return await axios.post(`${BASE_URL}/atina/AtinaUsers/refresh`, {
      accessToken: token,
      refreshToken: refreshToken,
    });
  };

  const retryAPICallAfterUnauthorizedResponse = async (
    error,
    axiosInstanceBase,
  ) => {
    const originalRequest = error.config;

    console.log(error.config.baseUrl);

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshingRef.current) {
        isRefreshingRef.current = true;

        try {
          if (!session) {
            throw new Error("Session not found");
          }
          const { token, refreshToken } = session.user;
          const { data } = await refreshTokenCall(token, refreshToken);
          const newAccessToken = data?.accessToken;
          const newRefreshToken = data?.refreshToken;
          updateSession({
            ...session,
            user: {
              ...session.user,
              token: newAccessToken,
              refreshToken: newRefreshToken,
            },
          });

          isRefreshingRef.current = false;
          const currentSubscribers = [...refreshSubscribersRef.current];
          refreshSubscribersRef.current = [];
          callRefreshSubscribers(currentSubscribers, newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          toastSessionUpdateNotify();
          return axiosInstanceBase(originalRequest);
        } catch (refreshError) {
          dispatch(setSessionExpired({ isSessionExpired: true }));
          console.error("Token refresh failed", refreshError);
          isRefreshingRef.current = false;
        }
      }

      originalRequest._retry = true;

      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          console.log("API request was subscribed", originalRequest.url);
          resolve(axiosInstanceBase(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  };

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      Accept: "/*",
      "Content-Type": "application/json",
      "X-Client": "workflowmanager",
    },
  });

  const axiosFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      Accept: "/*",
      "Content-Type": "multipart/from-data",
    },
  });

  const axiosTableDataPhase1 = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      Accept: "/*",
      "Content-Type": "application/json",
    },
  });

  const axiosTableDataPhase2 = axios.create({
    baseURL: BASE_URL,
  });

  axiosWithToken.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) =>
      retryAPICallAfterUnauthorizedResponse(error, axiosWithToken),
  );
  axiosFormData.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) =>
      retryAPICallAfterUnauthorizedResponse(error, axiosFormData),
  );
  axiosTableDataPhase1.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) =>
      retryAPICallAfterUnauthorizedResponse(error, axiosTableDataPhase1),
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
