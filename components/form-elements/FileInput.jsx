import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import css from "@/styles/common-style.module.css";
import { Button } from "@mui/material";
import React, { useState } from "react";

const FileInput = ({ id, label, name, value, handleChange }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      if (handleChange) handleChange(event);
    }
  };
  const inputId = useId();
  return (
    <>
      <input
        id={"file-upload" + inputId}
        type="file"
        accept="image/*, application/pdf"
        style={{ display: "none", width: "100%" }}
        onChange={handleFileChange}
        name={name}
      />
      <label
        htmlFor={"file-upload" + inputId}
        className={css.flex_column}
        style={{ rowGap: "5px" }}
      >
        <Button
          variant="contained"
          fullWidth
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          {label}
        </Button>
        {fileName && <Typography variant="body2">{fileName}</Typography>}
      </label>
    </>
  );
};

export default FileInput;
