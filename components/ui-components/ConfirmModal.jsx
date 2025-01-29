import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmModal = ({ confirmModalValues, setConfirmModalValues }) => {
  const handleConfirm = confirmModalValues?.handleConfirm;
  const handleClose = () => {
    setConfirmModalValues((prev) => ({
      ...prev,
      isOpen: false,
      handleConfirm: null,
    }));
  };
  const handleSubmit = () => {
    if (typeof handleConfirm === "function") {
      handleConfirm();
      setConfirmModalValues((prev) => ({
        ...prev,
        handleConfirm: null,
        isOpen: false,
      }));
    }
  };
  return (
    <>
      <Dialog
        open={confirmModalValues?.isOpen || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ paddingBlock: "8px" }} id="alert-dialog-title">
          {confirmModalValues?.dialogTitle}
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
            {confirmModalValues?.dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            {confirmModalValues?.confirmBtnText}
          </Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
