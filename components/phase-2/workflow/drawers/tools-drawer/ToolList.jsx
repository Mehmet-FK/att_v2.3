import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import StepElement from "./StepElement";

const ToolList = ({ tools, title }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItemButton
        sx={{ bgcolor: "paper.background", color: "paper.text" }}
        onClick={handleClick}
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {tools.map((tool) => (
              <StepElement key={tool.name} tool={tool} />
            ))}
          </Box>
        </List>
      </Collapse>
    </Box>
  );
};

export default ToolList;
