import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import React, { memo, useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import FilterHead from "../FilterHead";
import DateInput from "@/components/form-elements/DateInput";
import TimeInput from "@/components/form-elements/TimeInput";
import useTableDataCalls from "@/hooks/useTableDataCalls";
import useFilters from "@/hooks/useFilters";
import { client, settlement } from "@/helpers/Constants";
// import useFilters from "@/hooks/useFilters";
const usersFilterParams = {
  bookingType: null,
  street: null,
  streetnumber: null,
  zip: null,
  city: null,
  country: null,

  username: null,
  dateFrom: null,
  dateTo: null,
  timeFrom: null,
  timeTo: null,
};

const UsersFilter = () => {
  const { filterUsers, resetFilter } = useFilters();
  const [open, setOpen] = useState(false);

  const [filterVal, setFilterVal] = useState(usersFilterParams);

  const handleFilter = useCallback(
    (e) => {
      e.preventDefault();
      filterUsers(filterVal);
    },
    [filterVal]
  );

  const handleReset = useCallback(() => {
    setFilterVal(usersFilterParams);
    resetFilter("users");
  }, []);

  const handleChange = useCallback(
    (e) => {
      setFilterVal({
        ...filterVal,
        [e.target.name]: e.target.value,
      });
      // console.log(filterVal);
    },
    [filterVal]
  );

  return (
    <Box component={Paper} style={filterStyles.container}>
      <FilterHead open={open} setOpen={setOpen} pageTitle={"Benutzer"} />
      <Collapse sx={{ width: "100%" }} in={open} timeout="auto" unmountOnExit>
        <Box component="form" style={filterStyles.insideWrapper}>
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="mandant">Mandant</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="mandant"
                  id="demo-select-small"
                  value={filterVal?.client || ""}
                  label="Mandant"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, client: e.target.value })
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
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {item}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.client || ""}
                variant="outlined"
                size="small"
                label="Mandant"
                name="client"
              /> */}
            </Grid>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="Standort">Standort</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="Standort"
                  id="demo-select-small"
                  value={filterVal?.settlement || ""}
                  label="Standort"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, settlement: e.target.value })
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
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {item}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} />
            <Grid item md={2} />
            <Grid item md={2} />
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.firstname || ""}
                variant="outlined"
                size="small"
                label="Vorname"
                name="firstname"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.lastname || ""}
                variant="outlined"
                size="small"
                label="Nachname"
                name="lastname"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.username || ""}
                variant="outlined"
                size="small"
                label="Benutzername"
                name="username"
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.personnelnumber || ""}
                variant="outlined"
                size="small"
                label="Personalnummer"
                name="personnelnumber"
              />
            </Grid>
          </Grid>
          <div style={filterStyles.buttonWrapper}>
            <Button
              sx={filterStyles.button}
              type="submit"
              variant="contained"
              color="secondary"
              onClick={(e) => handleFilter(e)}
            >
              {" "}
              Suchen{" "}
            </Button>
            <Button
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
              onClick={() => handleReset()}
            >
              {" "}
              Löschen{" "}
            </Button>
          </div>
        </Box>
      </Collapse>
    </Box>
  );
};

export const filterStyles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    transition: "all 0.3s",
    // position: "sticky",
    // zIndex: "3",
    border: "1px solid #ddd5",
    borderRadius: "0 1rem 0 0",
  },
  icon: {
    fontSize: "1.5rem",
    fontWeight: "900",
    // paddingInline: "0.5rem",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
    transition: "all 1s",
  },
  insideWrapper: {
    width: "100%",
    transition: "all 0.3s",
    // display: open ? "flex" : "none",
    flexDirection: "column",
    rowGap: "8px",
    paddingInline: "1rem",
  },
  grid: {
    container: {
      width: "100%",
      columnGap: "10px",
      rowGap: "5px",
      alignItems: "start",
    },
  },
  textField: { width: "100%", cursor: "pointer", color: "secondary" },
  buttonWrapper: {
    display: "flex",
    columnGap: "5px",
    justifyContent: "end",
    padding: "0.5rem 3rem",
    // paddingInline: "0.5rem 3rem",
    // paddingBottom: "",
  },
  button: {
    bgcolor: "primary",
  },
};

export default UsersFilter;
