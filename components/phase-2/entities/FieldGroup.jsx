import TextField from "@mui/material/TextField";
import css from "@/styles/entity-styles/entities-comp.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";
import AutoCompleteSelect from "../workflow/forms/common-form-elements/AutoCompleteSelect";
import CustomSelect from "../workflow/forms/common-form-elements/CustomSelect";
import ValidationSection from "./field-sections/ValidationSection";
import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import EntitySortingSection from "./field-sections/EntitySortingSection";
import FieldPropertiesSection from "./field-sections/FieldPropertiesSection";
import ElementBadge from "../workflow/forms/common-form-elements/ElementBadge";
import { useAutoCompleteEntities } from "@/context/AutoCompleteEntityContext";
import FieldOptionsSection from "./field-options/FieldOptionsSection";

const optionTypesForSelect = [
  { id: 0, caption: "Benutzerdefiniert" },
  { id: 1, caption: "Auswahl" },
  { id: 2, caption: "Mehrfachauswahl" },
];

const FieldGroup = ({ field, setConfirmModalValues }) => {
  const { viewColumns, fieldTypes } = useSelector(
    (state) => state.attensam.data
  );
  const [fieldForm, setFieldForm] = useState({ ...field, optionType: 0 });

  const { autoCompleteEntities } = useAutoCompleteEntities();

  const { updateEntityFieldValue, deleteEntityField } = useEntityForm();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFieldForm({ ...fieldForm, [name]: inputValue });
  };

  const fieldTypesForSelect = Object.keys(fieldTypes || {}).map(
    (opt, index) => ({ id: Number(fieldTypes[opt]), caption: opt })
  );
  const handleDeleteEntityField = () => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie das Feld "${
        fieldForm?.name || fieldForm?.fieldId
      }" löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteEntityField(field.fieldId),
    };
    setConfirmModalValues(temp);
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    if (name === "linkedEntityId") {
      inputValue = inputValue?.toString();
    }

    updateEntityFieldValue(name, inputValue, field.fieldId);
  };
  const accordionHeader = field?.name
    ? field?.fieldId + " - " + field?.name
    : "Neues Feld";
  return (
    <ElementBadge
      handleClickOnBadge={handleDeleteEntityField}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      badgeSx={{ marginRight: "10px" }}
      badgeTitle="Feld Löschen"
    >
      <Accordion header={accordionHeader}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              size="small"
              label="Name"
              value={fieldForm.name || ""}
              name="name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
            />
            <TextField
              size="small"
              label="Caption"
              value={fieldForm.caption || ""}
              name="caption"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
            />

            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={fieldForm.dataSourceColumn}
              label="DataSource Spalten"
              name="dataSourceColumn"
              preferences={{ key: "columnName", caption: "columnName" }}
              options={viewColumns}
              size={"small"}
            />
          </div>

          <div className={css.flex_row}>
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={fieldForm.type}
              label="Typ"
              name="type"
              preferences={{ key: "id", caption: "caption" }}
              options={fieldTypesForSelect}
              size={"small"}
            />

            <TextField
              size="small"
              label="Gruppenname"
              value={fieldForm.groupName || ""}
              name="groupName"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />

            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: { key: "id", caption: "caption" },
                options: autoCompleteEntities || [],
                name: "linkedEntityId",
                value: fieldForm.linkedEntityId || "",
                label: "Verlinkte Entität",
              }}
              helperProps={{
                className: css.auto_complete_select,
                fullWidth: true,
                size: "small",
              }}
            />
          </div>
          <div className={css.flex_row}>
            <TextField
              size="small"
              label="Dezimalstellen"
              value={fieldForm.decimalPlaces || ""}
              name="decimalPlaces"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              size="small"
              label="Maximale Länge"
              value={fieldForm.maxLength || ""}
              name="maxLength"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              size="small"
              label="Validierungsregeln"
              value={fieldForm.validationId || ""}
              name="validationId"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </div>
          <div className={css.flex_row}>
            <CustomSelect
              handleChange={handleChange}
              value={fieldForm.optionType || 0}
              label="Optionstyp"
              name="optionType"
              preferences={{ key: "id", caption: "caption" }}
              options={optionTypesForSelect}
              size={"small"}
            />
            <div className={css.flex_row}>
              <CheckBox
                name="showMobile"
                checked={fieldForm.showMobile}
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="Show Mobile"
              />
              <CheckBox
                name="isReadOnly"
                checked={fieldForm.isReadOnly}
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="isReadOnly"
              />
              <CheckBox
                name="showByDefault"
                checked={fieldForm.showByDefault}
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="showByDefault"
              />
            </div>
            <div className={css.flex_row} />
          </div>
          <div className={css.flex_column} style={{ rowGap: "20px" }}>
            <div className={css.flex_row} style={{ paddingTop: "10px" }}>
              <ValidationSection
                fieldID={field.fieldId}
                setConfirmModalValues={setConfirmModalValues}
              />
              <EntitySortingSection
                fieldID={field.fieldId}
                setConfirmModalValues={setConfirmModalValues}
              />
            </div>
            <div className={css.flex_row} style={{ paddingTop: "10px" }}>
              <FieldPropertiesSection
                fieldID={field.fieldId}
                setConfirmModalValues={setConfirmModalValues}
              />
              <FieldOptionsSection
                fieldID={field.fieldId}
                optionType={fieldForm.optionType}
                setConfirmModalValues={setConfirmModalValues}
              />
            </div>
          </div>
        </div>
      </Accordion>
    </ElementBadge>
  );
};

export default FieldGroup;
