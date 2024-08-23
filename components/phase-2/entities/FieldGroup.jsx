import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import styles from "@/components/phase-2/entities/entities-comp.module.css";
import Select from "@/components/form-elements/Select";
import { useSelector } from "react-redux";

const FieldGroup = ({ field, removeField, handleFieldChange, index }) => {
  const { viewColumns, fieldTypes } = useSelector(
    (state) => state.attensam.data
  );

  return (
    <div className={styles.fieldFromGroup}>
      <span className={styles.closeBtn} onClick={() => removeField(field.id)}>
        ✖
      </span>

      <div className={styles.inputsWrapper}>
        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Name"
          value={field?.name || ""}
          name="name"
          variant="outlined"
          onChange={(e) => handleFieldChange(e, index)}
          required
        />
        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Caption"
          value={field?.caption || ""}
          name="caption"
          variant="outlined"
          onChange={(e) => handleFieldChange(e, index)}
          required
        />

        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Dezimalstellen"
          value={field?.decimalPlaces || ""}
          name="decimalPlaces"
          variant="outlined"
          onChange={(e) => handleFieldChange(e, index)}
        />
        <TextField
          sx={{ width: "10%" }}
          size="small"
          label="Länge"
          value={field?.maxLength || ""}
          name="maxLength"
          variant="outlined"
          onChange={(e) => handleFieldChange(e, index)}
        />
        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Gruppenname"
          value={field?.groupName || ""}
          name="groupName"
          variant="outlined"
          onChange={(e) => handleFieldChange(e, index)}
        />
        <Select
          label="Typ"
          name="type"
          width="20%"
          value={field?.type || ""}
          onChange={(e) => handleFieldChange(e, index)}
        >
          {/* <MenuItem value={""}><em>None</em></MenuItem> */}
          {Object.keys(fieldTypes || {}).map((opt, index) => (
            <MenuItem key={index} value={fieldTypes[opt]}>
              {opt}
            </MenuItem>
          ))}
        </Select>

        <Select
          label="DataSource Spalten"
          name="dataSourceColumn"
          width="20%"
          value={field?.dataSourceColumn || ""}
          onChange={(e) => handleFieldChange(e, index)}
          required
        >
          <MenuItem value={""}></MenuItem>
          {viewColumns?.map((opt, index) => (
            <MenuItem key={index} value={opt?.columnName}>
              {opt.columnName}
            </MenuItem>
          ))}
        </Select>
      </div>
      <FormGroup className={styles.checkboxWrapper}>
        <FormControlLabel
          className={styles.checkbox}
          control={
            <Checkbox
              size="small"
              name="showByDefault"
              onChange={(e) => handleFieldChange(e, index, true)}
              checked={field?.showByDefault || false}
            />
          }
          label="showByDefault"
        />
        <FormControlLabel
          className={styles.checkbox}
          control={
            <Checkbox
              size="small"
              name="isReadOnly"
              onChange={(e) => handleFieldChange(e, index, true)}
              checked={field?.isReadOnly || false}
            />
          }
          label="isReadOnly"
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheck}
              checked={field?.showByDefault || false}
            />
          }
          label="Als Standard anzeigen"
        /> */}
      </FormGroup>
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
