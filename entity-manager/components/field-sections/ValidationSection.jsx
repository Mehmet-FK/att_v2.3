import DateInput from "@/components/form-elements/DateInput";
import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/entity-manager/hooks/useEntityForm";
import TextField from "@mui/material/TextField";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/entity-styles/entities.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import ElementBadge from "@/components/ui-components/ElementBadge";
import CheckBox from "@/components/ui-components/CheckBox";

const ValidationSection = ({ fieldID, setConfirmModalValues }) => {
  const fieldValidations = useSelector(
    (state) => state.entity.fieldValidations
  );

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

  const handleDeleteFieldValidation = () => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie den Validierungsregel löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () =>
        deleteFieldValidationById(validation.fieldValidationId),
    };
    setConfirmModalValues(temp);
  };

  const addOrDeleteValidation = (e) => {
    if (validation) {
      handleDeleteFieldValidation();
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
      <ElementBadge
        handleClickOnBadge={addOrDeleteValidation}
        badgeContent={
          validationExists ? (
            <DeleteIcon color="secondary" fontSize="small" />
          ) : (
            <AddBoxIcon color="primary" fontSize="small" />
          )
        }
      >
        <Accordion
          accordionProps={{
            sx: { paddingBlock: 0, width: "100%" },
            disabled: !validationExists,
          }}
          header={"Validation"}
        >
          {validationExists && (
            <div className={css.flex_row}>
              <div className={css.flex_column}>
                <div className={css.flex_row}>
                  <div className={css.flex_column}>
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
                      label="Pattern"
                      value={validationFormValues?.pattern || ""}
                      name="pattern"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </div>
                  <div className={css.flex_column}>
                    <TextField
                      size="small"
                      label="minValue"
                      value={validationFormValues?.minValue || null}
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
                      value={validationFormValues?.maxValue || null}
                      name="maxValue"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="maxLength"
                      value={validationFormValues?.maxLength || null}
                      name="maxLength"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      fullWidth
                    />
                  </div>
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
                  {/* <div style={{ width: "100%", border: "2px solid red" }} /> */}
                </div>
              </div>
              <div className={css.flex_column}>
                <TextField
                  size="small"
                  label="Default Value"
                  value={validationFormValues?.regex || null}
                  name="regex"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={9}
                  fullWidth
                />

                {/* <div style={{ width: "100%" }} /> */}
              </div>
            </div>
          )}
        </Accordion>
      </ElementBadge>
    </div>
  );
};

export default ValidationSection;
