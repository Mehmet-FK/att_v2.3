import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModalTabs from "./modal-components/ModalTabs";
import css from "@/styles/modals.module.css";
import { useSelector } from "react-redux";

import RolesList from "./modal-components/RolesList";
import PasswordDialog from "./modal-components/PasswordDialog";
import { client, settlement } from "@/helpers/Constants";
import RolesList_phase2 from "./modal-components/RolesList_phase2";
import useTableDataCalls from "@/hooks/remote-api-hooks/useTableDataCalls";
import UserInfoTab from "./modal-components/UserInfoTab";
// import placeholder from "/assets/placeholder.jpg";

const UserModal = ({ setOpenUserModal, openUserModal, userInfo }) => {
  const initInputVal = useMemo(
    () => ({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      personnelnumber: "",
      roleIds: [],
    }),
    []
  );
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputVal, setInputVal] = useState(userInfo);
  const [roleIds, setRoleIds] = useState(userInfo?.roles);
  // const user = { isAdmin: true };
  const user = useSelector((state) => state.settings.user);
  // To keep the value of which tab is selected
  const [tab, setTab] = useState("Allgemein");
  const [tabValue, setTabValue] = useState(0);

  const { putUserData, postUserData } = useTableDataCalls();

  const handleClose = () => {
    setOpenUserModal(false);
  };
  const handleImageInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      const base64String = fileContent.split(",")[1];
      setSelectedImage(fileContent);
      setInputVal({ ...inputVal, image: base64String });
    };
    reader?.readAsDataURL(selectedFile);
  };

  const handleSubmit = () => {
    if (userInfo) {
      putUserData(inputVal);
      handleClose();
    } else {
      postUserData(inputVal);
      setInputVal(initInputVal);
      handleClose();
    }
  };

  useEffect(() => {
    if (userInfo) {
      // setRoleIds(userInfo?.roles);
      setInputVal({ ...userInfo?.userInfo, roleIds: userInfo?.roles });
    } else {
      setInputVal(initInputVal);
      // setRoleIds([]);
    }
  }, [userInfo]);
  useEffect(() => {
    setTab("Allgemein");
    setTabValue(0);
  }, [openUserModal]);
  return (
    <>
      <PasswordDialog
        setOpenPasswordDialog={setOpenPasswordDialog}
        openPasswordDialog={openPasswordDialog}
        setInputVal={setInputVal}
        inputVal={inputVal}
      />
      <Modal
        open={openUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={css.user_card}>
          <CardContent className={css.user_content}>
            <ModalTabs
              setTab={setTab}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
            {tab === "Allgemein" && (
              <UserInfoTab
                userInfo={userInfo}
                inputVal={inputVal}
                setInputVal={setInputVal}
                setOpenPasswordDialog={setOpenPasswordDialog}
              />
            )}
            {/* if tab is "Rolle" this part will be shown */}
            {tab === "Rolle" && (
              <RolesList_phase2 inputVal={inputVal} setInputVal={setInputVal} />
            )}
            <div
              style={{
                display: "flex",
                columnGap: "10px",
                paddingBlock: "10px",
              }}
            >
              {user?.isAdministrator && (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ width: "100%", bgcolor: "secondary.main" }}
                  color="secondary"
                >
                  Speichern
                </Button>
              )}
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{ width: "100%", bgcolor: "secondary.main" }}
              >
                {user?.isAdministrator ? "Abbrechen" : "Schließen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default UserModal;
