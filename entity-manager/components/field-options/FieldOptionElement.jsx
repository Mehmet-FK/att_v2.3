import css from "@/styles/entity-styles/entities.module.css";

import { Card, CardContent, MenuItem, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ElementBadge from "@/components/ui-components/ElementBadge";
import CustomSelect from "@/components/ui-components/CustomSelect";

const FieldOptionElement = ({
  fieldOption,
  optionType,
  openConfirmModaltoDeleteOption,
  deleteFieldOption,
  updateFieldOptionValue,
}) => {
  const [optionFormValues, setOptionFormValues] = useState(fieldOption);
  const optionSources = useSelector((state) => state.attensam.data?.views); // DataSource

  const handleDeleteOption = (e) => {
    if (e.ctrlKey) {
      const optionID = optionFormValues.fieldOptionId;
      deleteFieldOption(optionID);
    } else {
      openConfirmModaltoDeleteOption(optionFormValues);
    }
  };
  const nullFieldsList = ["optionSource", "optionSourceFilter"];
  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setOptionFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const optionID = optionFormValues.fieldOptionId;

    const { type, name, value, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    if (nullFieldsList.includes(name) && !value) {
      newValue = null;
    }
    updateFieldOptionValue(name, newValue, optionID);
  };

  useEffect(() => {
    setOptionFormValues(fieldOption);
  }, [fieldOption]);

  return (
    <ElementBadge
      handleClickOnBadge={handleDeleteOption}
      badgeSx={{
        marginRight: "10px",
        marginTop: "5px",
        width: "1.7rem",
        height: "1.7rem",
        backgroundColor: "#ccc",
        cursor: "pointer",
      }}
      containerSx={{
        width: "auto",
        maxWidth: "49%",
        minWidth: "40%",
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <div className={css.flex_column}>
            <div className={css.flex_row}>
              <TextField
                size="small"
                label="Value"
                value={optionFormValues?.value || ""}
                name="value"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              <TextField
                size="small"
                label="Caption"
                value={optionFormValues?.caption || ""}
                name="caption"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </div>

            <div className={css.flex_row}>
              <CustomSelect
                label="Option Source"
                name="optionSource"
                size="small"
                options={optionSources}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={optionFormValues?.optionSource}
                disabled={optionType === 0}
              />

              <TextField
                size="small"
                label="Option Source Filter"
                value={optionFormValues?.optionSourceFilter || ""}
                name="optionSourceFilter"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={optionType === 0}
                fullWidth
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </ElementBadge>
  );
};

export default FieldOptionElement;
