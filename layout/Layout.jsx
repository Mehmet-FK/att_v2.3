import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Tooltip, Typography } from "@mui/material";
import TapAndPlayOutlinedIcon from "@mui/icons-material/TapAndPlayOutlined";
import Link from "next/link";
import styles from "@/styles/layout.module.css";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import SchemaSharpIcon from "@mui/icons-material/SchemaSharp";
import FeedIcon from "@mui/icons-material/Feed";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppBar, Drawer, DrawerHeader } from "./layout_helpers";
import ProfileMenu from "@/components/menus/ProfileMenu";

// const ProfileMenu = dynamic(() => import("@/components/menus/ProfileMenu"));

export default function Layout({ children, toggleTheme }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLayout, setShowLayout] = useState(true);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getSessionData = async () => {
    const tempSession = await getSession();
    dispatch(setUser({ user: tempSession?.user }));
  };

  useEffect(() => {
    getSessionData();
  }, []);

  useEffect(() => {
    if (router.pathname === "/workflow") {
      setShowLayout(false);
      setOpen(false);
    } else setShowLayout(true);
  }, [router.pathname]);

  const drawerList = [
    {
      text: "Entities",
      icon: <FeedIcon />,
      nav: "/entities",
    },
    {
      text: "Workflow",
      icon: <FeedIcon />,
      nav: "/workflow",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <AppBar
        sx={{ backgroundColor: "navbar.main" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          {showLayout && (
            <div style={{ width: open ? 0 : "4rem", transition: "0.3s" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}
          <div className={styles.logoWrapper}>
            <Link href={"/"}>
              <Image
                src={"/assets/attensam-logo.svg"}
                alt="logo"
                loading="eager"
                width={150}
                height={50}
                priority
              />
              {/* <img
                style={styles.logo.img}
                src={"/assets/attensam-logo.svg"}
                alt="logo"
              /> */}
            </Link>
            <div
              style={{
                display: "flex",
                columnGap: "15px",
                alignItems: "center",
              }}
            >
              {/* <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                {`${user?.firstname} ${user?.lastname}`}
              </Typography>{" "} */}
              <Image
                onClick={handleClick}
                src={"/assets/emptyAvatar.jpg"}
                width={50}
                height={50}
                alt="profilePicture"
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              <ProfileMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                toggleTheme={toggleTheme}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {showLayout && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerList.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor: router.pathname === item.nav && "#bbbb",
                }}
              >
                <Tooltip title={item.text} placement="right" arrow>
                  <Link href={item.nav} className={styles.link}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </Tooltip>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "calc(100vh)",
          overflow: "hidden",
        }}
      >
        {showLayout && <DrawerHeader />}
        {children}
      </Box>
    </div>
  );
}
