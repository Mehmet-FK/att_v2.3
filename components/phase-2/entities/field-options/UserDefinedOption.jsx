import css from "@/styles/entity-styles/entities.module.css";

import { Card, CardContent, TextField } from "@mui/material";

import ElementBadge from "../../workflow/forms/common-form-elements/ElementBadge";
import { useEffect, useState } from "react";

const UserDefinedOption = ({
  fieldOption,
  openConfirmModaltoDeleteOption,
  deleteFieldOption,
  updateFieldOptionValue,
}) => {
  const [optionFormValues, setOptionFormValues] = useState(fieldOption);

  const handleDeleteOption = (e) => {
    if (e.ctrlKey) {
      const optionID = optionFormValues.fieldOptionId;
      deleteFieldOption(optionID);
    } else {
      openConfirmModaltoDeleteOption(optionFormValues);
    }
  };

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setOptionFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const optionID = optionFormValues.fieldOptionId;

    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
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
      containerSx={{ width: "auto", maxWidth: "100%", minWidth: "49%" }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <div className={css.flex_column}>
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
          </div>
        </CardContent>
      </Card>
    </ElementBadge>
  );
};

export default UserDefinedOption;
