import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import React, { useCallback, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterHead from "../FilterHead";
import useFilters from "@/hooks/useFilters";
import {
  itemTableTypeConstants,
  pageTitleConstants,
  tableNameConstants,
} from "@/helpers/Constants";

const ItemsFilter = ({ type, setType, setTriggerAPICall }) => {
  const { filterItems, resetFilter } = useFilters();
  const [open, setOpen] = useState(false);

  const [filterVal, setFilterVal] = useState({
    itemType: itemTableTypeConstants.ORDER,
  });

  const handleFilter = (e) => {
    e.preventDefault();
    setType(filterVal.itemType);
    filterItems(filterVal);
    setTriggerAPICall((prev) => !prev);
  };

  const handleReset = useCallback(() => {
    setFilterVal({ itemType: itemTableTypeConstants.ORDER });
    resetFilter(tableNameConstants.ITEMS);
    setType(itemTableTypeConstants.ORDER);
  }, []);

  const handleChange = useCallback(
    (e) => {
      setFilterVal({
        ...filterVal,
        [e.target.name]: e.target.value,
      });
    },
    [filterVal]
  );

  return (
    <Box component={Paper} sx={filterStyles.container}>
      <FilterHead
        open={open}
        setOpen={setOpen}
        pageTitle={pageTitleConstants.ITEMS_TABLE}
      />
      <Collapse sx={{ width: "100%" }} in={open} timeout="auto" unmountOnExit>
        <Box style={filterStyles.insideWrapper} component="form">
          {/* //? == ROW 1 == */}
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="itemType">Itemtyp</InputLabel>
                <Select
                  labelId="itemType"
                  id="demo-select-small"
                  value={filterVal?.itemType || itemTableTypeConstants.ORDER}
                  label="Itemtyp"
                  name="itemType"
                  onChange={handleChange}
                >
                  <MenuItem value={itemTableTypeConstants.ORDER}>
                    Auftrag
                  </MenuItem>
                  <MenuItem value={itemTableTypeConstants.METER}>
                    Zähler
                  </MenuItem>
                  <MenuItem value={itemTableTypeConstants.VEHICLE}>
                    KFZ
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemNumber || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Datensatznummer"
                name="itemNumber"
              />
            </Grid>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="filterOptions">Filteroptionen</InputLabel>
                <Select
                  labelId="filterOptions"
                  id="demo-select-small"
                  value={filterVal?.filterOptions || ""}
                  label="Filteroptionen"
                  name="filterOptions"
                  onChange={handleChange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"All"}>Alles</MenuItem>
                  <MenuItem value={"ItemsAssigned"}>zugeordnet</MenuItem>
                  <MenuItem value={"ItemsNotAssigned"}>
                    nicht zugeordnet
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} />
            {filterVal.itemType !== itemTableTypeConstants.VEHICLE && (
              <>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.street || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="Straße"
                    name="street"
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.streetnumber || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="Hausnummer"
                    name="streetnumber"
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.zip || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="PLZ"
                    name="zip"
                  />
                </Grid>

                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.city || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="Stadt"
                    name="city"
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    sx={filterStyles.textField}
                    value={filterVal.country || ""}
                    variant="outlined"
                    size="small"
                    label="Land"
                    name="country"
                  />
                </Grid>
              </>
            )}
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                sx={filterStyles.textField}
                value={filterVal.data1 || ""}
                variant="outlined"
                size="small"
                label={
                  filterVal.itemType === itemTableTypeConstants.ORDER
                    ? "Mandant"
                    : filterVal.itemType == itemTableTypeConstants.METER
                    ? "Letzte Ablesung am"
                    : "Mandant"
                }
                name="data1"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                sx={filterStyles.textField}
                value={filterVal.data2 || ""}
                variant="outlined"
                size="small"
                label={
                  filterVal.itemType === itemTableTypeConstants.ORDER
                    ? "Auftragsart"
                    : filterVal.itemType === itemTableTypeConstants.METER
                    ? "Letzte Ablesung"
                    : "Standort"
                }
                name="data2"
              />
            </Grid>
            {filterVal.itemType !== itemTableTypeConstants.METER && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data3 || ""}
                  variant="outlined"
                  size="small"
                  label={
                    filterVal.itemType === itemTableTypeConstants.ORDER
                      ? "Auftragsbetreff"
                      : filterVal.itemType === itemTableTypeConstants.VEHICLE &&
                        "Kennzeichen"
                  }
                  name="data3"
                />
              </Grid>
            )}
            {filterVal.itemType !== itemTableTypeConstants.METER && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data4 || ""}
                  variant="outlined"
                  size="small"
                  label={
                    filterVal.itemType === itemTableTypeConstants.ORDER
                      ? "Kundennummer"
                      : filterVal.itemType === itemTableTypeConstants.VEHICLE &&
                        "Modell"
                  }
                  name="data4"
                />
              </Grid>
            )}
            {filterVal.itemType === itemTableTypeConstants.ORDER && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data5 || ""}
                  variant="outlined"
                  size="small"
                  label="Kundenname"
                  name="data5"
                />
              </Grid>
            )}
          </Grid>
          <div style={filterStyles.buttonWrapper}>
            <Button
              type="submit"
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
              onClick={(e) => handleFilter(e)}
            >
              Suchen
            </Button>
            <Button
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
              onClick={() => handleReset()}
            >
              Löschen
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

    border: "1px solid #ddd5",
    borderRadius: "0 1rem 0 0",
  },
  icon: {
    fontSize: "1.5rem",
    fontWeight: "900",
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
  },
  button: {
    bgcolor: "primary",
  },
};

export default ItemsFilter;
