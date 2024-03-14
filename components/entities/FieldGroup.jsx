import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
} from "@mui/material";

import styles from "./entities-comp.module.css";
import { useEffect, useState } from "react";
import Select from "../Select";
import { useSelector } from "react-redux";

const FieldGroup = ({ field, removeField, setFields, view }) => {
  const [fieldValue, setFieldValue] = useState({ ...field });

  const { viewColumns } = useSelector((state) => state.attensam.data);

  const handleChange = (e) => {
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
    // console.log(fieldValue);
  };
  const handleCheck = (e) => {
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    setFields((prev) => {
      const temp = [...prev];
      temp[field.index] = fieldValue;
      return temp;
    });
  }, [fieldValue]);

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
          onChange={handleChange}
        />
        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Caption"
          value={field?.caption || ""}
          name="caption"
          variant="outlined"
          onChange={handleChange}
        />

        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Dezimalstellen"
          value={field?.decimalPlaces || ""}
          name="decimalPlaces"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          sx={{ width: "10%" }}
          size="small"
          label="Länge"
          value={field?.maxLength || ""}
          name="maxLength"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          sx={{ width: "20%" }}
          size="small"
          label="Gruppenname"
          value={field?.groupName || ""}
          name="groupName"
          variant="outlined"
          onChange={handleChange}
        />
        <Select
          label="Typ"
          name="type"
          width="20%"
          value={field?.type || ""}
          onChange={handleChange}
        >
          {["", "", "", "", "", "", "", "", "", ""].map((opt, index) => (
            <MenuItem key={index} value={index}>
              Type {index}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="View Spalten"
          name="dataSourceColumn"
          width="20%"
          value={field?.dataSourceColumn || ""}
          onChange={handleChange}
        >
          {viewColumns?.map((opt, index) => (
            <MenuItem key={index} value={opt.columnName}>
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
              onChange={handleCheck}
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
              onChange={handleCheck}
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
