import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/settingsSlice";

const SessionHandler = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.settings);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Update Redux store with session data
      dispatch(
        setUser({
          user: {
            avatar: session.user?.avatar,
            roles: session.user?.roles,
            token: session.user.token,
            refreshToken: session.user.refreshToken,
            ...session.user.userInfo,
          },
        })
      );
    } else if (status === "unauthenticated") {
      // Clear Redux store when user logs out
      dispatch(
        setUser({
          user: {
            ...user,
            token: "",
            refreshToken: "",
          },
        })
      );
    }
  }, [session, status, dispatch]);

  return null; // No UI; this is just a session listener
};

export default SessionHandler;
