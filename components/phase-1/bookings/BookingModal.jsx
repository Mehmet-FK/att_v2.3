import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { memo, useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import css from "@/styles/modals.module.css";

const BookingModal = ({ setOpenBookingModal, openBookingModal, booking }) => {
  const bookingTypes = useSelector(
    (state) => state.attensam.data?.bookingTypes
  );
  const handleClose = () => {
    setOpenBookingModal(false);
  };
  const [inputVal, setInputVal] = useState({});
  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const adapterDayjs = new AdapterDayjs();
    const isValid = adapterDayjs.isValid(inputVal?.Date);
    const currentValues = {
      ...inputVal,
      Date: isValid ? inputVal.Date : null,
    };
    setInputVal({
      ...inputVal,
      Date: isValid ? inputVal.Date : null,
    });
  };

  useEffect(() => {
    if (booking) {
      setInputVal({
        ...booking,

        Time: booking?.Time?.slice(0, booking?.Time.lastIndexOf(":")),
      });
    } else {
      setInputVal(initialBookingParams);
    }
  }, [booking]);
  return (
    <>
      <Modal
        open={openBookingModal}
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
                paddingInline: "15px",
              }}
            >
              <LibraryBooksIcon fontSize="large" />
              <Typography variant="h5">Mobile Buchungen</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <CardContent className={css.content}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              }}
            >
              <div className={css.book_inputgroup}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    disabled={true}
                    label="Datum"
                    size="small"
                    format="DD.MM.YYYY"
                    name="Date"
                    sx={{ width: "100%" }}
                    onChange={(newVal) => {
                      setInputVal({
                        ...inputVal,
                        Date: new Date(newVal?.$d),
                      });
                    }}
                    value={inputVal?.Date}
                  />
                </LocalizationProvider> */}
                <TextField
                  disabled={true}
                  variant="outlined"
                  label="Uhrzeit"
                  size="small"
                  name="Time"
                  sx={{ width: "100%" }}
                  value={inputVal?.Time || ""}
                  onChange={(e) =>
                    setInputVal({
                      ...inputVal,
                      Time: e.target.value,
                    })
                  }
                />{" "}
              </div>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="bookingType">Buchungstyp</InputLabel>
                <Select
                  disabled={true}
                  readOnly={true}
                  labelId="bookingType"
                  id="demo-select-small"
                  value={inputVal?.BookingType || ""}
                  label="Buchungstyp"
                  onChange={(e) =>
                    setInputVal({ ...inputVal, BookingType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {bookingTypes &&
                    Object.entries(bookingTypes)?.map((item, i) => {
                      return (
                        <MenuItem key={i} value={item[0]}>
                          {item[1]?.Caption}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <TextField
                disabled={true}
                variant="outlined"
                label="Datensatznummer"
                size="small"
                sx={{ width: "100%" }}
                name="Itemnumber"
                onChange={handleChange}
                value={inputVal.Itemnumber || ""}
              />
              <TextField
                disabled={true}
                variant="outlined"
                label="Straße"
                size="small"
                sx={{ width: "100%" }}
                name="Street"
                onChange={handleChange}
                value={inputVal.Street || ""}
              />

              <TextField
                disabled={true}
                variant="outlined"
                label="Hausnummer"
                size="small"
                sx={{ width: "100%" }}
                name="Streetnumber"
                onChange={handleChange}
                value={inputVal.Streetnumber || ""}
              />

              <div style={{ display: "flex" }}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  label="PLZ"
                  size="small"
                  sx={{ width: "100%" }}
                  name="ZIP"
                  onChange={handleChange}
                  value={inputVal.ZIP || ""}
                />

                <TextField
                  disabled={true}
                  variant="outlined"
                  label="Stadt"
                  size="small"
                  sx={{ width: "100%" }}
                  name="City"
                  onChange={handleChange}
                  value={inputVal.City || ""}
                />
              </div>

              <TextField
                disabled={true}
                variant="outlined"
                label="Land"
                size="small"
                name="Country"
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={inputVal.Country || ""}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* {user.isAdmin && (
                <Button
                  onClick={handleSubmit}
                  className={css.button}
                  variant="contained"
                  color="secondary"
                >
                  Speichern
                </Button>
              )} */}
              <Button
                className={css.button}
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Schließen
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default memo(BookingModal);
