import { TextField } from "@mui/material";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import { useState } from "react";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useEffect } from "react";

const ListViewElementRow = ({ elementRowValues }) => {
  const [rowValues, setRowValues] = useState(elementRowValues);

  const { updateListViewElementRowValue, deleteListViewElementRowByRowId } =
    useWorkflowForms();

  const removeRow = () => {
    const rowId = elementRowValues.listViewElementRowId;
    deleteListViewElementRowByRowId(rowId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowValues({ ...rowValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const rowId = elementRowValues.listViewElementRowId;

    updateListViewElementRowValue(name, value, rowId);
  };
  useEffect(() => {
    setRowValues(elementRowValues);
  }, [elementRowValues.listViewElementRowId]);

  return (
    <div
      style={{
        border: "1px solid #aaa5",
        padding: "5px",
        position: "relative",
      }}
      className={css.flex_column}
    >
      <div className={css.flex_row}>
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={rowValues?.text || ""}
          variant="outlined"
          size="small"
          label="Text"
          name="text"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={rowValues?.listViewRowNumber || ""}
          variant="outlined"
          size="small"
          label="Row Number"
          name="listViewRowNumber"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={rowValues?.fontFamily || ""}
          variant="outlined"
          size="small"
          label="Font Family"
          name="fontFamily"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={rowValues?.fontColor || ""}
          variant="outlined"
          size="small"
          label="Font Color"
          name="fontColor"
          fullWidth
        />
      </div>
      <span
        title="remove row"
        className={css.remove_row_btn}
        onClick={removeRow}
      >
        ×
      </span>
    </div>
  );
};
export default ListViewElementRow;
