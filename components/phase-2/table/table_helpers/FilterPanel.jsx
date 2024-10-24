import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import css from "@/styles/filter-panel.module.css";
import { Button, Collapse } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import TextInput from "@/components/form-elements/TextInput";
import DateInput from "@/components/form-elements/DateInput";
import useFilters from "@/hooks/useFilters";
import FilterHead from "@/components/phase-2/table/table_helpers/FilterHead";

const FilterPanel = ({ fieldsObject, module }) => {
  const { filterGeneric, resetFilter } = useFilters();
  const [open, setOpen] = useState(true);

  const [filterValues, setFilterValues] = useState({});

  const handleChange = (e) =>
    setFilterValues({ ...filterValues, [e.target.name]: e.target.value });

  const handleReset = useCallback(() => {
    const temp = { ...filterValues };
    for (const key in temp) {
      temp[key] = null;
    }
    setFilterValues(temp);
    resetFilter(module);
  }, []);

  const extractFilterFields = (fieldsObject) => {
    // const fields = headers.filter((h) => fieldsObject[h].isFilterable);
    const fields = Object.values(fieldsObject).map((field) => {
      // const field = fieldsObject[h];

      if (field?.isFilterable) {
        switch (field?.type) {
          case "Date":
            return (
              <DateInput
                filterValue={filterValues}
                setFilterValue={setFilterValues}
                label={field?.caption}
                name={field?.name}
              />
            );

          case "Time":
            break;

          case "Enum":
            break;

          default:
            return (
              <TextInput
                value={filterValues[field?.name]}
                fieldKey={field?.name}
                handleChange={handleChange}
                label={field?.caption}
              />
            );
        }
      }
    });
    return fields.filter((f) => f !== undefined);
  };

  const fields = extractFilterFields(fieldsObject);

  return (
    <Box component={Paper} className={css.container}>
      <FilterHead open={open} setOpen={setOpen} pageTitle={module} />
      <Collapse
        component="form"
        in={open}
        sx={{ width: "100%" }}
        timeout="auto"
        unmountOnExit
      >
        {/* <div className={css.grid}>{...fields}</div> */}
        <div style={filterStyles.buttonWrapper}>
          <Button
            type="submit"
            color="secondary"
            sx={filterStyles.button}
            variant="contained"
            onClick={(e) => handleFilter(e)}
          >
            {" "}
            Suchen{" "}
          </Button>
          <Button
            color="secondary"
            sx={filterStyles.button}
            variant="contained"
            onClick={() => handleReset()}
          >
            {" "}
            Löschen{" "}
          </Button>
        </div>
      </Collapse>
    </Box>
  );
};

export default FilterPanel;

export const filterStyles = {
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
