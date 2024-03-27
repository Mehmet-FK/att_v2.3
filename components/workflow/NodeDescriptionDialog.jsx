import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

const NodeDescriptionDialog = ({ handleClose, open, info, setInfo }) => {
  const [inputVal, setInputVal] = useState(info);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      setInfo(inputVal);
      handleClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ paddingBottom: 0 }}>View Beschreibung</DialogTitle>
      <Box sx={{ padding: "1rem", minWidth: "20rem" }}>
        <TextField
          sx={{ width: "100%" }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputVal || ``}
          multiline
          rows={4}
          variant="standard"
        />
      </Box>
    </Dialog>
  );
};

export default NodeDescriptionDialog;
