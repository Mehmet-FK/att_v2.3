import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { client, settlement } from "@/helpers/Constants";

import React from "react";
import { useSelector } from "react-redux";

const UserInfoTab = ({
  userInfo,
  inputVal,
  setInputVal,
  setOpenPasswordDialog,
}) => {
  const { user } = useSelector((state) => state.settings);
  const handleChange = (e) => {
    if (!user?.isAdministrator) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };
  return (
    <>
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
                <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                  None
                </Typography>
              </MenuItem>
              {client?.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    <Typography sx={{ fontSize: "0.7rem" }}>{item}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

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
              <MenuItem value={""}>
                <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                  None
                </Typography>
              </MenuItem>
              {settlement?.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    <Typography sx={{ fontSize: "0.7rem" }}>{item}</Typography>
                  </MenuItem>
                );
              })}
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
    </>
  );
};

export default UserInfoTab;
