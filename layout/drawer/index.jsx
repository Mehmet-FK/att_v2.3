import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { CustomSvgIcon, Drawer, DrawerHeader } from "../layout_helpers";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import ListElement from "./ListElement";

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
        styles={{ width: "23px" }}
      />
    ),
    nav: "/mobile-bookings",
  },
  {
    text: "Datensätze",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/items.svg"}
        styles={{ width: "23px" }}
      />
    ),
    nav: "/items",
  },
  {
    text: "Benutzer",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/users.svg"}
        styles={{ width: "23px" }}
      />
    ),
    nav: "/users",
  },
];
const drawerListAdmin = [
  ...drawerList,
  {
    text: "Workflows",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/workflows.svg"}
        styles={{ width: "23px" }}
      />
    ),
    nav: "/workflows",
  },
  {
    text: "Entitäten",
    icon: (
      <CustomSvgIcon
        src={"/assets/dashboard-icons/entities.svg"}
        styles={{ width: "23px" }}
      />
    ),
    nav: "/entities",
  },
];

const LayoutDrawer = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const user = useSelector((state) => state.settings.user);

  return (
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
          (element) => (
            <ListElement elementInfo={element} open={open} key={element.text} />
          )
        )}
      </List>

      <Divider />
    </Drawer>
  );
};

export default LayoutDrawer;
