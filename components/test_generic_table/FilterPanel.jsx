import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import css from "@/styles/filter-panel.module.css";
import { Collapse } from "@mui/material";
import { useState } from "react";
import FilterHead from "./FilterHead";
import TextInput from "../form-elements/TextInput";
import DateInput from "../form-elements/DateInput";

const FilterPanel = ({ fieldsObject, headers }) => {
  const [open, setOpen] = useState(true);

  const [filterValues, setFilterValues] = useState({});
  const handleChange = (e) => console.log("textInput");

  const extractFilterFields = (fieldsObject) => {
    // const fields = headers.filter((h) => fieldsObject[h].isFilterable);
    const fields = headers.map((h) => {
      const field = fieldsObject[h];

      if (field.isFilterable) {
        switch (field.type) {
          case "Date":
            return <DateInput />;
            break;

          case "Time":
            break;

          case "Enum":
            break;

          default:
            return (
              <TextInput
                value={filterValues[h]}
                fieldKey={h}
                handleChange={handleChange}
                label={field.caption}
              />
            );
        }
      }
    });
    return fields.filter((f) => f !== undefined);
  };

  const fields = extractFilterFields(fieldsObject);

  return (
    <Box component={Paper} className={"fp_container"}>
      <FilterHead open={open} setOpen={setOpen} pageTitle="Mobile Buchungen" />
      <Collapse
        component="form"
        in={open}
        sx={{ width: "100%" }}
        timeout="auto"
        unmountOnExit
      >
        <div className={"fp_grid"}>{...fields}</div>
      </Collapse>
    </Box>
  );
};

export default FilterPanel;
