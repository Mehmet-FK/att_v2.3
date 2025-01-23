import DateInput from "@/components/form-elements/DateInput";
import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import { Badge, Button, Fab, IconButton, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/entities.module.css";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

const ValidationSection = ({ fieldID }) => {
  const { fieldValidations } = useSelector((state) => state.entity);

  const validation = useMemo(
    () => fieldValidations.find((v) => v.fieldId === fieldID),
    [fieldValidations]
  );
  const [validationFormValues, setValidationFormValues] = useState(
    validation || {}
  );

  const {
    createFieldValidation,
    updateFieldValidationValue,
    deleteFieldValidationById,
  } = useEntityForm();

  const addOrDeleteValidation = (e) => {
    if (validation) {
      if (e.detail < 2) return;
      deleteFieldValidationById(validation.fieldValidationId);
    } else {
      createFieldValidation(fieldID);
    }
  };

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setValidationFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    updateFieldValidationValue(name, newValue, validation.fieldValidationId);
  };

  const validationExists = validation ? true : false;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={
          validationExists ? (
            <DeleteIcon color="secondary" fontSize="small" />
          ) : (
            <AddBoxIcon color="primary" fontSize="small" />
          )
        }
        slotProps={{
          badge: {
            sx: {
              marginLeft: "10px",
              width: "1.7rem",
              height: "1.7rem",
              cursor: "pointer",
              backgroundColor: "#ccc",
            },
            onClick: addOrDeleteValidation,
          },
        }}
        sx={{ width: "100%", height: "100%" }}
      >
        <Accordion
          sx={{ paddingBlock: 0, width: "100%" }}
          disabled={!validationExists}
          header={"Validation"}
        >
          {validationExists && (
            <>
              <div className={css.flex_row}>
                <DateInput
                  filterValue={validationFormValues}
                  setFilterValue={setValidationFormValues}
                  label="minDate"
                  name="minDate"
                  handleBlur={handleBlur}
                />
                <DateInput
                  filterValue={validationFormValues}
                  setFilterValue={setValidationFormValues}
                  label="maxDate"
                  name="maxDate"
                  handleBlur={handleBlur}
                />

                <TextField
                  size="small"
                  label="minValue"
                  value={validationFormValues?.minValue || ""}
                  name="minValue"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  fullWidth
                />

                <TextField
                  size="small"
                  label="maxValue"
                  value={validationFormValues?.maxValue || ""}
                  name="maxValue"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  fullWidth
                />
              </div>
              <div className={css.flex_row}>
                <TextField
                  size="small"
                  label="Pattern"
                  value={validationFormValues?.pattern || ""}
                  name="pattern"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Regex"
                  value={validationFormValues?.regex || ""}
                  name="regex"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="maxLength"
                  value={validationFormValues?.maxLength || ""}
                  name="maxLength"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  fullWidth
                />
                <div style={{ width: "100%" }} />
              </div>
              <div className={css.flex_row}>
                <CheckBox
                  name="isReadOnly"
                  checked={validationFormValues?.isReadOnly}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  label="isReadOnly"
                />
                <CheckBox
                  name="showByDefault"
                  checked={validationFormValues?.showByDefault}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  label="showByDefault"
                />
                <CheckBox
                  name="required"
                  checked={validationFormValues?.required}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  label="required"
                />
                <div style={{ width: "100%" }} />
              </div>
            </>
          )}
        </Accordion>
      </Badge>
    </div>
  );
};

export default ValidationSection;
