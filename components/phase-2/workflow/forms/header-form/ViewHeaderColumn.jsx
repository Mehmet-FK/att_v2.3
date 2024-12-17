import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import css from "@/styles/workflow-forms/header-form.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomSelect from "../common-form-elements/CustomSelect";

const ViewHeaderColumn = ({ columnValues }) => {
  const columnTypes = [
    {
      id: "0",
      caption: "Text",
    },
    {
      id: "1",
      caption: "Value",
    },
    {
      id: "2",
      caption: "Icon",
    },
    {
      id: "3",
      caption: "Variable",
    },
  ];
  const [columnFormValues, setColumnFormValues] = useState(columnValues);

  const { updateViewHeaderColumnValue, deleteViewHeaderColumn } =
    useWorkflowForms();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColumnFormValues({ ...columnFormValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateViewHeaderColumnValue(name, value, columnValues.headerColumnId);
  };
  const removeColumn = () => {
    const columnId = columnValues.headerColumnId;
    console.log(columnId);
    deleteViewHeaderColumn(columnId);
  };
  useEffect(() => {
    setColumnFormValues(columnValues);
  }, [columnValues.headerColumnId]);

  return (
    <div className={css.header_column_container}>
      <HighlightOffIcon
        onClick={removeColumn}
        title="remove column"
        sx={{
          position: "absolute",
          right: "0",
          top: "0",
          opacity: "0.3",
          color: "#fff",
          backgroundColor: "#f00",
          zIndex: 5,
          cursor: "pointer",
          padding: "2px",
          borderRadius: "2px 2px 2px 8px",
          transition: "all 0.1s ease-in-out",

          "&:hover": { opacity: 1, color: "#fff", backgroundColor: "#f00" },
        }}
      />
      <div className={css.flex_row}>
        <CustomSelect
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={columnFormValues?.columnType || ""}
          label="Spaltentyp"
          name="columnType"
          preferences={{ key: "id", caption: "caption" }}
          options={columnTypes}
          size="small"
        />

        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.columnValue || ""}
          variant="outlined"
          size="small"
          label="Column Value"
          name="columnValue"
          fullWidth
        />
      </div>
      <div className={css.flex_row}>
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.colSpan || ""}
          variant="outlined"
          size="small"
          label="Column Span"
          name="colSpan"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.rowSpan || ""}
          variant="outlined"
          size="small"
          label="Row Span"
          name="rowSpan"
          fullWidth
        />
      </div>
      <div className={css.flex_row}>
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.fontFamily || ""}
          variant="outlined"
          size="small"
          label="Font Family"
          name="fontFamily"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.fontColor || ""}
          variant="outlined"
          size="small"
          label="Font Color"
          name="fontColor"
          fullWidth
        />
      </div>
    </div>
  );
};

export default ViewHeaderColumn;
