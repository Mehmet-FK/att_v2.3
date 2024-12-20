import { useTheme } from "@mui/material/styles";
//ICONS
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchemaSharpIcon from "@mui/icons-material/SchemaSharp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FeedIcon from "@mui/icons-material/Feed";
import HomeIcon from "@mui/icons-material/Home";
//
//MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip, Typography } from "@mui/material";
//
// From nextJS
import Link from "next/link";
import css from "@/styles/layout.module.css";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
//
// From React & Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/settingsSlice";
import { useEffect, useState } from "react";
//
// Custom Components
import { AppBar, CustomSvgIcon, Drawer, DrawerHeader } from "./layout_helpers";
import ProfileMenu from "@/components/menus/ProfileMenu";
import { LaunchModuleShape } from "@/components/phase-2/workflow/nodes/node-comps/Shapes";

const drawerList = [
  {
    text: "Home",
    icon: <HomeIcon />,
    nav: "/",
  },
  {
    text: "Mobile Buchungen",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/bookings.svg"}
        width="23px"
      />
    ),
    nav: "/mobile-bookings",
  },
  {
    text: "Datensätze",
    icon: (
      <CustomSvgIcon src={"/assets/dashboard-icons/items.svg"} width="23px" />
    ),
    nav: "/items",
  },
  {
    text: "Benutzer",
    icon: (
      <CustomSvgIcon src={"/assets/dashboard-icons/users.svg"} width="23px" />
    ),
    nav: "/users",
  },
];
const drawerListAdmin = [
  {
    text: "Home",
    icon: <HomeIcon />,
    nav: "/",
  },
  {
    text: "Mobile Buchungen",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/bookings.svg"}
        width="23px"
      />
    ),
    nav: "/mobile-bookings",
  },
  {
    text: "Datensätze",
    icon: (
      <CustomSvgIcon src={"/assets/dashboard-icons/items.svg"} width="23px" />
    ),
    nav: "/items",
  },
  {
    text: "Benutzer",
    icon: (
      <CustomSvgIcon src={"/assets/dashboard-icons/users.svg"} width="23px" />
    ),
    nav: "/users",
  },
  {
    text: "Workflows",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/workflows.svg"}
        width="23px"
      />
    ),
    nav: "/workflows",
  },
  {
    text: "Entitäten",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/entities.svg"}
        width="23px"
      />
    ),
    nav: "/entities",
  },
];

export default function Layout({ children, toggleTheme }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useSelector((state) => state.settings);

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
    const session = await getSession();
    const user = session?.user;
    const credentials = {
      avatar: user?.avatar,
      roles: user?.roles,
      refreshToken: user?.refreshToken,
      token: user?.token,
      ...user?.userInfo,
    };

    dispatch(setUser({ user: credentials }));
  };
  const userAvatar = user?.avatar;

  const avatar = userAvatar
    ? userAvatar?.url + "?" + userAvatar?.lastEdited
    : "/assets/emptyAvatar.jpg";
  // useEffect(() => {
  //   getSessionData();
  // }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AppBar
        sx={{ backgroundColor: "navbar.main" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
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

          <div className={css.logoWrapper}>
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
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                {`${user?.firstname} ${user?.lastname}`}
              </Typography>{" "}
              <Image
                onClick={handleClick}
                src={avatar}
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
      (
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
          {(user?.userId === 5573 ? drawerListAdmin : drawerList).map(
            (item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor: router.pathname === item.nav && "#bbbb",
                }}
              >
                <Tooltip title={item.text} placement="right" arrow>
                  <Link href={item.nav} className={css.link}>
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
            )
          )}
        </List>

        <Divider />
      </Drawer>
      )
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
