import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const RestoreWorkflowConfirmDialog = ({ open, setOpen, onConfirm, onDeny }) => {
  const handleCloseOnDeny = () => {
    onDeny();
    setOpen(false);
  };
  const handleCloseOnConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Vorhandenes Workflow wiederherstellen?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Von Ihrer letzen Sitzung haben wir ein Entwurf gefunden. Möchten Sie
            mit dem weitermachen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOnDeny}>Nein</Button>
          <Button onClick={handleCloseOnConfirm} autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestoreWorkflowConfirmDialog;
