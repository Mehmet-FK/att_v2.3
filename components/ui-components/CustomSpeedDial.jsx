import { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const CustomSpeedDial = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        height: 330,
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="Workflow Options"
        sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 1201 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            title={action.name}
            key={action.name}
            icon={action.icon}
            onClick={() => {
              action.onclick();
              handleClose();
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
export default CustomSpeedDial;
