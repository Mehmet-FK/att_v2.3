import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";

const ElementBadge = ({
  children,
  anchorOrigin,
  badgeContent,
  badgeSx,
  badgeProps,
  badgeTitle,
  handleClickOnBadge,
  containerSx,
  containerProps,
}) => {
  const _badgeContent = badgeContent ? (
    badgeContent
  ) : (
    <DeleteIcon color="secondary" fontSize="small" />
  );

  return (
    <Badge
      anchorOrigin={{ vertical: "top", horizontal: "left", ...anchorOrigin }}
      badgeContent={_badgeContent}
      slotProps={{
        badge: {
          title: badgeTitle || "",
          sx: {
            marginLeft: "10px",
            width: "1.7rem",
            height: "1.7rem",
            backgroundColor: "#ccc",
            cursor: "pointer",
            display: "flex",
            opacity: "0",
            transition: "all 0.2s ease-in-out",
            ...badgeSx,
          },
          onClick: handleClickOnBadge || null,
          ...badgeProps,
        },
      }}
      sx={{
        width: "100%",

        backgroundColor: "inherit",
        "&:hover > .MuiBadge-badge": {
          opacity: 1,
        },

        ...containerSx,
      }}
      {...containerProps}
    >
      {children}
    </Badge>
  );
};

export default ElementBadge;
