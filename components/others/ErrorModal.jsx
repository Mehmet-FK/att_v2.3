import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import css from "@/styles/modals.module.css";
import { useEffect, useState } from "react";

const ErrorModal = ({ error }) => {
  const [open, setOpen] = useState(error ? true : false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    error && handleOpen();
  }, [error]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 0,
        },
      }}
    >
      <Fade in={open}>
        <div className={css.error_modal}>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Fehler
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {error}
            </Typography>
          </div>
          <img
            style={{ width: "7rem", height: "7rem" }}
            alt="error"
            src={"/assets/error.png"}
          />
        </div>
      </Fade>
    </Modal>
  );
};

export default ErrorModal;
