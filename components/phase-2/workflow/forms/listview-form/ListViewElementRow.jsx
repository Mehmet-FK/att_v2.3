import { TextField } from "@mui/material";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import { useState } from "react";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useEffect } from "react";
import ColorPicker from "../common-form-elements/ColorPicker";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
    <div className={css.list_element_container}>
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
      <ColorPicker
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={rowValues?.fontColor || "#000000"}
        label="Font Color"
        name="fontColor"
        fullWidth
        size={"small"}
      />

      <span
        title="remove row"
        className={css.remove_row_btn}
        onClick={removeRow}
      >
        <HighlightOffIcon fontSize="small" />
      </span>
    </div>
  );
};
export default ListViewElementRow;
