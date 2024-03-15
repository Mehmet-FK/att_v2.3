import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

//* Confirm Dialog Props Template
/* const confirmProps = {
    dialogTitle: "Title",
    dialogContent: "Lorem Ipsum",
    acceptBtnText: "Löschen",
    acceptFunc: () => console.log("first"),
  };
 */

const ConfirmModal = ({
  open,
  setOpen,
  confirmProps: { dialogTitle, dialogContent, acceptBtnText, acceptFunc },
}) => {
  //   const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen({ ...open, isOpen: false });
  };

  return (
    <>
      <Dialog
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ paddingBlock: "8px" }} id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: "400px",
          }}
        >
          <DialogContentText
            sx={{ paddingTop: "10px" }}
            id="alert-dialog-description"
          >
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptFunc}>{acceptBtnText}</Button>
          <Button onClick={handleClose} autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
