import Box from "@mui/material/Box";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setSelectedEnvironment, setUser } from "@/redux/slices/settingsSlice";
import { useEffect, useState } from "react";
import { DrawerHeader } from "./layout_helpers";
import Navbar from "./Navbar";
import LayoutDrawer from "./drawer";

export default function Layout({ children, toggleTheme }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getSessionData = async () => {
    const session = await getSession();
    const user = session?.user;
    console.log(session);
    const credentials = {
      avatar: user?.avatar,
      roles: user?.roles,
      refreshToken: user?.refreshToken,
      token: user?.token,
      ...user?.userInfo,
    };

    dispatch(setUser({ user: credentials }));
    dispatch(setSelectedEnvironment({ environment: user.environment }));
  };

  useEffect(() => {
    getSessionData();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navbar
        handleDrawerOpen={handleDrawerOpen}
        toggleTheme={toggleTheme}
        open={open}
      />
      <LayoutDrawer handleDrawerClose={handleDrawerClose} open={open} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 64px)",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </div>
  );
}
