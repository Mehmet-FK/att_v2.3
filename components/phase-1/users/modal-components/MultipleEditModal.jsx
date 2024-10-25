// import css from "@/styles/modals.module.css";
import RolesList_phase2 from "./RolesList_phase2";
import { useSelector } from "react-redux";
import { useState } from "react";
import useTableDataCalls from "@/hooks/useTableDataCalls";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CloseIcon from "@mui/icons-material/Close";

const MultipleEditModal = ({ openModal, setOpenModal, checkboxColumn }) => {
  const { userRoles } = useSelector((state) => state.attensam.data.userRoles);
  const [inputVal, setInputVal] = useState({ roleIds: [] });
  const { assignMultipleUserRoles } = useTableDataCalls();

  //   const handleClick = (e) => {
  //     if (e.target.checked) {
  //         setInputVal((pre) => ({...pre, roleIds: [...pre, e.target.value])});
  //     } else {
  //       setRoleIds((pre) => [...pre.filter((x) => x !== e.target.value)]);
  //     }
  //   };

  const handleClose = () => {
    setOpenModal(false);
    setInputVal({ roleIds: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { selectedRows, data } = checkboxColumn;
    // const editedRoles = roleIds.map((id) => Number(id));
    assignMultipleUserRoles(selectedRows, inputVal.roleIds, data);
    handleClose();
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card component="form" className={"mod_user_card"}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                columnGap: "10px",
                alignItems: "center",
              }}
            >
              <ChecklistIcon fontSize="large" />
              <Typography variant="h5">Berechtigung zuweisen</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <RolesList_phase2 inputVal={inputVal} setInputVal={setInputVal} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              columnGap: "8px",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ width: "100%", bgcolor: "secondary.main" }}
              color="secondary"
            >
              Speichern
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ width: "100%", bgcolor: "secondary.main" }}
            >
              Abbrechen
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default MultipleEditModal;
