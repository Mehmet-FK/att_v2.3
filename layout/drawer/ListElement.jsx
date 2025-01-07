import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import css from "@/styles/layout.module.css";
import { useRouter } from "next/router";

const ListElement = ({ elementInfo, open }) => {
  const router = useRouter();
  return (
    <ListItem
      disablePadding
      sx={{
        display: "block",
        backgroundColor: router.pathname === elementInfo.nav && "#bbbb",
      }}
    >
      <Tooltip title={elementInfo.text} placement="right" arrow>
        <Link href={elementInfo.nav} className={css.link}>
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
              {elementInfo.icon}
            </ListItemIcon>
            <ListItemText
              primary={elementInfo.text}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </Link>
      </Tooltip>
    </ListItem>
  );
};

export default ListElement;
