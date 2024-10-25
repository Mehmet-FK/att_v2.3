// import css from "@/styles/filter-panel.module.css";
import TextField from "@mui/material/TextField";
const TextInput = ({ fieldKey, value, label, handleChange }) => {
  return (
    <TextField
      //   sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
      className={"fp_textinput"}
      onChange={handleChange}
      value={value || ""}
      variant="outlined"
      size="small"
      label={label}
      name={fieldKey}
    />
  );
};

export default TextInput;
