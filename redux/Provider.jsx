import { Provider, useDispatch } from "react-redux";
import store from "./app/store";
import { useEffect } from "react";
import { getSession, SessionProvider } from "next-auth/react";
import { setSelectedEnvironment, setUser } from "./slices/settingsSlice";
import { ThemeProvider } from "@mui/material";

const AtinaSessionProvider = ({ session, children }) => {
  const dispatch = useDispatch();

  const updateUserData = () => {
    const user = session?.user;
    const credentials = {
      avatar: user?.avatar,
      roles: user?.roles,
      refreshToken: user?.refreshToken,
      token: user?.token,
      ...user?.userInfo,
    };

    dispatch(setUser({ user: credentials }));
    dispatch(setSelectedEnvironment({ environment: user?.environment }));
  };

  useEffect(() => {
    updateUserData();
  }, [session?.user]);

  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
};

const Providers = ({ theme, session, children }) => {
  return (
    <Provider store={store}>
      <AtinaSessionProvider session={session}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AtinaSessionProvider>
    </Provider>
  );
};

export default Providers;
