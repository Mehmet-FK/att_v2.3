import { TextField } from "@mui/material";
import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import { useState } from "react";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import { useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { fontFamilies } from "@/helpers/Enums";
import CustomSelect from "@/components/ui-components/CustomSelect";
import ColorPicker from "@/components/ui-components/ColorPicker";

const ListViewElementRow = ({
  elementRowValues,
  entityFields,
  openConfirmModalToDelete,
}) => {
  const [rowValues, setRowValues] = useState(elementRowValues);

  const { updateListViewElementRowValue, deleteListViewElementRowByRowId } =
    useWorkflowForms();

  const removeRow = () => {
    const rowId = elementRowValues?.listViewElementRowId;
    deleteListViewElementRowByRowId(rowId);
  };

  const handleDeleteElementRow = () => {
    openConfirmModalToDelete(removeRow);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowValues({ ...rowValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const rowId = elementRowValues?.listViewElementRowId;

    updateListViewElementRowValue(name, value, rowId);
  };
  useEffect(() => {
    setRowValues(elementRowValues);
  }, [elementRowValues?.listViewElementRowId]);

  return (
    <div className={css.list_element_container}>
      <CustomSelect
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={rowValues?.text}
        label="Text"
        name="text"
        preferences={{ key: "id", value: "caption", caption: "caption" }}
        options={entityFields}
        size={"small"}
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

      <CustomSelect
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={rowValues?.fontFamily}
        label="Font Family"
        name="fontFamily"
        preferences={{ key: "id", caption: "caption" }}
        options={fontFamilies}
        size={"small"}
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
        onClick={handleDeleteElementRow}
      >
        <HighlightOffIcon fontSize="small" />
      </span>
    </div>
  );
};
export default ListViewElementRow;
