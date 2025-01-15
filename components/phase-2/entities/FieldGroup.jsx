import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import css from "@/styles/entities-comp.module.css";
import Select from "@/components/form-elements/Select";
import { useSelector } from "react-redux";
import { useState } from "react";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";
import AutoCompleteSelect from "../workflow/forms/common-form-elements/AutoCompleteSelect";
import CustomSelect from "../workflow/forms/common-form-elements/CustomSelect";

const FieldGroup = ({
  field,
  handleBlur,
  removeField,
  entitiesForAutoSelect,
}) => {
  const { viewColumns, fieldTypes } = useSelector(
    (state) => state.attensam.data
  );

  const [fieldForm, setFieldForm] = useState(field);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFieldForm({ ...fieldForm, [name]: inputValue });
  };

  const fieldTypesForSelect = Object.keys(fieldTypes || {}).map(
    (opt, index) => ({ id: fieldTypes[opt], caption: opt })
  );

  return (
    <div className={css.field_from_group}>
      <span className={css.close_button} onClick={() => removeField(field.id)}>
        ✖
      </span>

      <div className={css.inputs_wrapper}>
        <div className={css.flex_column}></div>
        <div className={css.flex_row}>
          <TextField
            size="small"
            label="Name"
            value={fieldForm.name || ""}
            name="name"
            variant="outlined"
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, field.id)}
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
            onBlur={(e) => handleBlur(e, field.id)}
            required
            fullWidth
          />

          <CustomSelect
            handleChange={handleChange}
            handleBlur={(e) => handleBlur(e, field.id)}
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
            handleBlur={(e) => handleBlur(e, field.id)}
            value={fieldForm.type}
            label="Typ"
            name="type"
            preferences={{ key: "id", caption: "caption" }}
            options={fieldTypesForSelect}
            size={"small"}
          />
          {/* <Select
            label="Typ"
            name="type"
            value={fieldForm.type || ""}
            onBlur={(e) => handleBlur(e, field.id)}
            onChange={handleChange}
            fullWidth
          >
            {Object.keys(fieldTypes || {}).map((opt, index) => (
              <MenuItem key={index} value={fieldTypes[opt]}>
                {opt}
              </MenuItem>
            ))}
          </Select> */}
          <TextField
            size="small"
            label="Gruppenname"
            value={fieldForm.groupName || ""}
            name="groupName"
            variant="outlined"
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, field.id)}
            fullWidth
          />

          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: (e) => handleBlur(e, field.id),
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
            onBlur={(e) => handleBlur(e, field.id)}
            fullWidth
          />
          <TextField
            size="small"
            label="Maximale Länge"
            value={fieldForm.maxLength || ""}
            name="maxLength"
            variant="outlined"
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, field.id)}
            fullWidth
          />
          <TextField
            size="small"
            label="Validierungsregeln"
            value={fieldForm.validationId || ""}
            name="validationId"
            variant="outlined"
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, field.id)}
            fullWidth
          />
        </div>
        <div className={css.flex_row}>
          <CheckBox
            name="showMobile"
            checked={field.showMobile}
            handleChange={handleChange}
            handleBlur={(e) => handleBlur(e, field.id)}
            label="Show Mobile"
          />
          <CheckBox
            name="isReadOnly"
            checked={field.isReadOnly}
            handleChange={handleChange}
            handleBlur={(e) => handleBlur(e, field.id)}
            label="isReadOnly"
          />
          <CheckBox
            name="showByDefault"
            checked={field.showByDefault}
            handleChange={handleChange}
            handleBlur={(e) => handleBlur(e, field.id)}
            label="showByDefault"
          />
        </div>
      </div>
      {/* <FormGroup className={css.checkbox_wrapper}>
        <FormControlLabel
          className={css.checkbox}
          control={
            <Checkbox
              size="small"
              name="showByDefault"
              onChange={handleChange}
              checked={fieldForm.showByDefault || false}
            />
          }
          label="showByDefault"
        />
        <FormControlLabel
          className={css.checkbox}
          control={
            <Checkbox
              size="small"
              name="isReadOnly"
              onChange={handleChange}
              checked={fieldForm.isReadOnly || false}
            />
          }
          label="isReadOnly"
        />
  
      </FormGroup> */}
    </div>
  );
};

export default FieldGroup;
caption: "fields_f";
createDate: "2024-03-14T14:13:55.7489243";
dataSourceColumn: "GAR_Notes";
decimalPlaces: null;
entityId: 32;
groupName: null;
id: 20;
isReadOnly: null;
maxLength: null;
modifiedDate: "2024-03-14T14:13:55.7489244";
name: "fields_f";
showByDefault: null;
type: 6;
