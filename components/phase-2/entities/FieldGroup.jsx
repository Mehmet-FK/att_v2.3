import TextField from "@mui/material/TextField";
import css from "@/styles/entity-styles/entities-comp.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";
import AutoCompleteSelect from "../workflow/forms/common-form-elements/AutoCompleteSelect";
import CustomSelect from "../workflow/forms/common-form-elements/CustomSelect";
import ValidationSection from "./ValidationSection";
import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import EntitySortingSection from "./EntitySortingSection";
import FieldPropertiesSection from "./field-sections/FieldPropertiesSection";

const FieldGroup = ({ field, entitiesForAutoSelect }) => {
  const { viewColumns, fieldTypes } = useSelector(
    (state) => state.attensam.data
  );
  const [fieldForm, setFieldForm] = useState(field);

  const { updateEntityFieldValue, deleteEntityField } = useEntityForm();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFieldForm({ ...fieldForm, [name]: inputValue });
  };

  const fieldTypesForSelect = Object.keys(fieldTypes || {}).map(
    (opt, index) => ({ id: fieldTypes[opt], caption: opt })
  );

  const removeField = () => {
    deleteEntityField(field.fieldId);
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    updateEntityFieldValue(name, inputValue, field.fieldId);
  };

  return (
    <Accordion
      accordionProps={{ sx: { paddingBlock: 0 } }}
      header={field?.name || "Neues Feld"}
    >
      <div className={css.field_from_group}>
        <span
          className={css.close_button}
          onClick={() => removeField(field.id)}
        >
          ✖
        </span>

        {/* <div className={css.inputs_wrapper}> */}
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
                options: entitiesForAutoSelect || [],
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
          <div className={css.flex_column} style={{ rowGap: "20px" }}>
            <div className={css.flex_row} style={{ paddingTop: "10px" }}>
              <ValidationSection fieldID={field.fieldId} />
              <EntitySortingSection fieldID={field.fieldId} />
            </div>
            <FieldPropertiesSection fieldID={field.fieldId} />
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default FieldGroup;
