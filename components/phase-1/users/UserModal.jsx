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
// import css from "@/styles/modals.module.css";
import { useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import RolesList from "./modal-components/RolesList";
import PasswordDialog from "./modal-components/PasswordDialog";
import { client, settlement } from "@/helpers/Constants";
import RolesList_phase2 from "./modal-components/RolesList_phase2";
import useTableDataCalls from "@/hooks/useTableDataCalls";
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
  const { user } = useSelector((state) => state.settings);
  // To keep the value of which tab is selected
  const [tab, setTab] = useState("Allgemein");
  const [tabValue, setTabValue] = useState(0);

  // const { client, settlement } = useSelector((state) => state.atina);

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
  const handleChange = (e) => {
    if (!user?.isAdministrator) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
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
        <Card className={"mod_user_card"}>
          <ModalTabs
            setTab={setTab}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
          {/* if tab is "Allgemein" this part will be shown */}
          {tab === "Allgemein" && (
            <div
              style={
                {
                  // marginTop: -15,
                }
              }
            >
              {/* ============== ⇩ It is going to be necessary ⇩ ========== */}

              {/* <label htmlFor="imgInput"> */}

              <div
                style={{
                  height: "15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "7rem",
                  color: "#00000033",

                  backgroundColor: "#a5a6a7dd",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={
                    userInfo?.avatarUrl?.url
                      ? userInfo?.avatarUrl?.url
                      : "/assets/placeholder.jpg"
                  }
                  alt="profile-pic"
                />
              </div>

              {/* </label> */}
              <CardContent className={"mod_user_content"}>
                <div className={"mod_user_inputgroup"}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <FormControl
                      sx={{ minWidth: 120, width: "100%" }}
                      size="small"
                      disabled={!user?.isAdministrator}
                    >
                      <InputLabel id="mandant">Mandant</InputLabel>
                      <Select
                        sx={{ width: "100%" }}
                        labelId="mandant"
                        id="demo-select-small"
                        value={inputVal?.client || ""}
                        label="Mandant"
                        readOnly={!user?.isAdministrator}
                        onChange={(e) =>
                          setInputVal({ ...inputVal, client: e.target.value })
                        }
                        MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                      >
                        <MenuItem value={""}>
                          <Typography
                            component="em"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            None
                          </Typography>
                        </MenuItem>
                        {client?.map((item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              <Typography sx={{ fontSize: "0.7rem" }}>
                                {item}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {/* <TextField
                      variant="outlined"
                      label="Mandant"
                      size="small"
                      name="client"
                      sx={{ width: "100%" }}
                      value={inputVal?.client || ""}
                      onChange={handleChange}
                    />{" "} */}
                    <FormControl
                      sx={{
                        minWidth: 120,
                        width: "100%",
                      }}
                      size="small"
                      disabled={!user?.isAdministrator}
                    >
                      <InputLabel id="standort">Standort</InputLabel>
                      <Select
                        sx={{ width: "100%", maxHeight: "50px" }}
                        labelId="standort"
                        id="demo-select-small"
                        value={inputVal?.settlement || ""}
                        label="standort"
                        readOnly={!user?.isAdministrator}
                        onChange={(e) =>
                          setInputVal({
                            ...inputVal,
                            settlement: e.target.value,
                          })
                        }
                        MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                      >
                        {/* <div style={{ maxHeight: "200px" }}> */}
                        <MenuItem value={""}>
                          <Typography
                            component="em"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            None
                          </Typography>
                        </MenuItem>
                        {settlement?.map((item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              <Typography sx={{ fontSize: "0.7rem" }}>
                                {item}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                        {/* </div> */}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "8px",
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Vorname"
                    size="small"
                    name="firstname"
                    required
                    value={inputVal?.firstname || ""}
                    onChange={handleChange}
                    disabled={!user?.isAdministrator}
                  />

                  <TextField
                    variant="outlined"
                    label="Nachname"
                    size="small"
                    name="lastname"
                    required
                    value={inputVal?.lastname || ""}
                    onChange={handleChange}
                    disabled={!user?.isAdministrator}
                  />

                  <TextField
                    variant="outlined"
                    label="Personalnummer"
                    size="small"
                    name="personnelnumber"
                    required
                    value={inputVal?.personnelnumber || ""}
                    onChange={handleChange}
                    disabled={!user?.isAdministrator}
                  />
                </div>
                <TextField
                  variant="outlined"
                  label="Benutzername"
                  size="small"
                  name="username"
                  sx={{ width: "100%" }}
                  value={inputVal?.username || ""}
                  onChange={handleChange}
                  required
                  disabled={!user?.isAdministrator}
                />{" "}
                {!userInfo && (
                  <TextField
                    variant="outlined"
                    label="Kennwort"
                    size="small"
                    type={visible ? "text" : "password"}
                    name="password"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    value={inputVal?.password || ""}
                    required={userInfo ? false : true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visible && (
                            <VisibilityOffIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                          {visible && (
                            <VisibilityIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}{" "}
                {user?.isAdministrator && userInfo && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: "-35px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        paddingLeft: "10px",
                        width: "55%",
                      }}
                    >
                      Passwort:
                    </span>
                    <Button
                      size="small"
                      sx={{ width: "45%", bgcolor: "secondary.main" }}
                      variant="contained"
                      onClick={() => setOpenPasswordDialog(true)}
                    >
                      Passwort ändern
                    </Button>
                  </div>
                )}
              </CardContent>
            </div>
          )}
          {/* if tab is "Rolle" this part will be shown */}
          {tab === "Rolle" && (
            // <RolesList
            //   inputVal={inputVal}
            //   setInputVal={setInputVal}
            //   setRoleIds={setRoleIds}
            //   roleIds={roleIds}
            // />
            <RolesList_phase2 inputVal={inputVal} setInputVal={setInputVal} />
          )}
          <div
            style={{
              display: "flex",
              // justifyContent: "space-around",
              columnGap: "10px",
              paddingTop: "20px",
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
        </Card>
      </Modal>
    </>
  );
};

export default UserModal;
