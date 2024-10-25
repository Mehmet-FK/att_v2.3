import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TapAndPlayIcon from "@mui/icons-material/TapAndPlay";
// import css from "@/styles/modals.module.css";

const VehicleModal = ({
  item,
  handleClose,
  openItemsModal,
  handleChange,
  inputVal,
  isAdmin,
}) => {
  return (
    <Modal
      open={openItemsModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ height: 440 }} className={"mod_card"}>
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
              columnGap: "5px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TapAndPlayIcon fontSize="large" />
            <Typography variant="h5">Datensätze (KFZ)</Typography>
          </div>
          <div style={{ textAlign: "right" }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <CardContent className={"mod_content"}>
          {item && (
            <Grid
              container
              sx={{ justifyContent: "space-between", rowGap: 1.5 }}
            >
              {/* <Grid item md={6}>
                <TextField
                  variant="outlined"
                  label="Itemtype"
                  size="small"
                  // name="itemID"
                  sx={{ width: "100%" }}
                  value={"KFZ"}
                  // onChange={handleChange}
                />{" "}
              </Grid> */}
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Artikelnummer"
                  size="small"
                  name="itemNumber"
                  sx={{ width: "100%" }}
                  value={inputVal?.itemNumber || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Mandant"
                  size="small"
                  name="data1"
                  sx={{ width: "100%" }}
                  value={inputVal?.data1 || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Standort"
                  size="small"
                  name="data2"
                  sx={{ width: "100%" }}
                  value={inputVal?.data2 || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Kennzeichen"
                  size="small"
                  name="data3"
                  sx={{ width: "100%" }}
                  value={inputVal?.data3 || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Modell"
                  size="small"
                  name="data4"
                  sx={{ width: "100%" }}
                  value={inputVal?.data4 || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
          {!item && (
            <Grid
              container
              sx={{ justifyContent: "space-between", rowGap: 1.5 }}
            >
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Itemtype"
                  size="small"
                  // name="itemID"
                  sx={{ width: "100%" }}
                  value={"KFZ"}
                  // onChange={handleChange}
                />{" "}
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Artikelnummer"
                  size="small"
                  name="itemNumber"
                  sx={{ width: "100%" }}
                  value={inputVal?.itemNumber || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Mandant"
                  size="small"
                  name="data1"
                  sx={{ width: "100%" }}
                  value={inputVal?.data1 || ""}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Standort"
                  size="small"
                  name="data2"
                  sx={{ width: "100%" }}
                  value={inputVal?.data2 || ""}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Kennzeichen"
                  size="small"
                  name="data3"
                  sx={{ width: "100%" }}
                  value={inputVal?.data3 || ""}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  disabled={!isAdmin}
                  variant="outlined"
                  label="Modell"
                  size="small"
                  name="data4"
                  sx={{ width: "100%" }}
                  value={inputVal?.data4 || ""}
                />
              </Grid>
            </Grid>
          )}

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {isAdmin && (
              <Button
                className={"mod_content"}
                variant="contained"
                color="secondary"
              >
                Speichern
              </Button>
            )}
            <Button
              className={"mod_content"}
              //   onClick={handleDelete}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              {isAdmin ? "Abbrechen" : "Schliessen"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default VehicleModal;
