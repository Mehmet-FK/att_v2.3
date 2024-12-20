import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";
// import { FaExclamationTriangle } from "react-icons/fa";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 12,
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: 48,
    color: theme.palette.warning.main,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1, 4),
  fontSize: "1rem",
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SessionExpiredModal = () => {
  const { sessionExpired } = useSelector((state) => state.settings);

  const handleLogin = () => {
    signIn();
  };

  return (
    // <Fade in={open}>
    <StyledDialog
      open={sessionExpired}
      aria-labelledby="session-expired-dialog-title"
      aria-describedby="session-expired-dialog-description"
      TransitionProps={
        {
          // onExited: () => setOpen(false),
        }
      }
    >
      <DialogTitle id="session-expired-dialog-title">
        <IconWrapper>{/* <FaExclamationTriangle /> */}</IconWrapper>
        <Typography variant="h5" align="center" gutterBottom>
          Session Expired
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="session-expired-dialog-description"
          align="center"
        >
          Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <StyledButton
          onClick={handleLogin}
          variant="contained"
          color="primary"
          aria-label="Go to login page"
        >
          Zur Login Seite
        </StyledButton>
      </DialogActions>
    </StyledDialog>
    // </Fade>
  );
};

export default SessionExpiredModal;
