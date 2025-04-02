import css from "@/styles/layout.module.css";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography } from "@mui/material";
import { AppBar } from "./layout_helpers";
import ProfileMenu from "@/components/menus/ProfileMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = ({ handleDrawerOpen, toggleTheme, open }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const user = useSelector((state) => state.settings.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userAvatar = user?.avatar;
  const avatar = userAvatar?.url
    ? userAvatar?.url + "?" + userAvatar?.lastEdited
    : "/assets/emptyAvatar.jpg";
  return (
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
  );
};

export default Navbar;
