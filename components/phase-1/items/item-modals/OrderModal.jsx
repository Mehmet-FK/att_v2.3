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
import css from "@/styles/modals.module.css";

const OrderModal = ({
  item,
  handleClose,
  openItemsModal,
  handleChange,
  inputVal,
  isAdmin,
}) => {
  return (
    <>
      <Modal
        open={openItemsModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ height: 440 }} className={css.card}>
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
              <TapAndPlayIcon fontSize="large" />
              <Typography variant="h5">Datensätze (Auftrag)</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <CardContent className={css.content}>
            {item && (
              <Grid
                container
                sx={{ justifyContent: "space-between", rowGap: 1.5 }}
              >
                <Grid item md={4}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Datensatznummer"
                    size="small"
                    name="itemNumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.itemNumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Straße"
                    size="small"
                    name="street"
                    sx={{ width: "100%" }}
                    value={inputVal?.street || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    name="streetnumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.streetnumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    name="zip"
                    sx={{ width: "100%" }}
                    value={inputVal?.zip || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    name="city"
                    sx={{ width: "100%" }}
                    value={inputVal?.city || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Land"
                    size="small"
                    name="country"
                    sx={{ width: "100%" }}
                    value={inputVal?.country || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
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
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Auftragsart"
                    size="small"
                    name="data2"
                    sx={{ width: "100%" }}
                    value={inputVal?.data2 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Auftragsbetreff"
                    size="small"
                    name="data3"
                    sx={{ width: "100%" }}
                    value={inputVal?.data3 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Kundennummer"
                    size="small"
                    name="data4"
                    sx={{ width: "100%" }}
                    value={inputVal?.data4 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Kundenname"
                    size="small"
                    name="data5"
                    sx={{ width: "100%" }}
                    value={inputVal?.data5 || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            {!item && (
              <Grid
                container
                sx={{ justifyContent: "space-between", rowGap: 2 }}
              >
                {/*  <TextField
                disabled={!isAdmin}
                  variant="outlined"
                  label="Artikel ID"
                  size="small"
                  name="itemID"
                  value={inputVal.itemID || ""}
                  onChange={handleChange}
                />{" "} */}
                <Grid item md={4}>
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
                <Grid item md={8}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Straße"
                    size="small"
                    name="street"
                    sx={{ width: "100%" }}
                    value={inputVal?.street || ""}
                    onChange={handleChange}
                  />
                </Grid>
                {/* <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                 */}

                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    name="streetnumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.streetnumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    name="zip"
                    sx={{ width: "100%" }}
                    value={inputVal?.zip || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    name="city"
                    sx={{ width: "100%" }}
                    value={inputVal?.city || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Land"
                    size="small"
                    name="country"
                    sx={{ width: "100%" }}
                    value={inputVal?.country || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
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
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Auftragsart"
                    size="small"
                    name="data2"
                    sx={{ width: "100%" }}
                    value={inputVal?.data2 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Auftragsbetreff"
                    size="small"
                    name="data3"
                    sx={{ width: "100%" }}
                    value={inputVal?.data3 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Kundennummer"
                    size="small"
                    name="data4"
                    sx={{ width: "100%" }}
                    value={inputVal?.data4 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={!isAdmin}
                    variant="outlined"
                    label="Kundenname"
                    size="small"
                    name="data5"
                    sx={{ width: "100%" }}
                    value={inputVal?.data5 || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {isAdmin && (
                <Button
                  className={css.button}
                  variant="contained"
                  color="secondary"
                >
                  Speichern
                </Button>
              )}
              <Button
                className={css.button}
                //   onClick={handleDelete}
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                {isAdmin ? "Abbrechen" : "schliessen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default OrderModal;
