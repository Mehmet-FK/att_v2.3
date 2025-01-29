import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import css from "@/styles/workflow-forms-styles/header-form.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomSelect from "../common-form-elements/CustomSelect";
import ColorPicker from "../common-form-elements/ColorPicker";
import {
  fontFamilies,
  headerColumnTextAlignments,
  headerColumnTypes,
  headerColumnValueVariables,
} from "@/helpers/Enums";
import { columnTypeConstants } from "@/helpers/Constants";
import ElementBadge from "../common-form-elements/ElementBadge";

const ColumnValueInput = ({
  handleChange,
  handleBlur,
  columnType,
  columnValue,
  entityFields,
}) => {
  if (columnType === columnTypeConstants.VARIABLE) {
    const entityFieldsForSelect = [
      ...headerColumnValueVariables,
      ...(entityFields ? entityFields : []),
    ];
    return (
      <CustomSelect
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={columnValue}
        label="Column Value"
        name="columnValue"
        preferences={{ key: "id", value: "id", caption: "caption" }}
        options={entityFieldsForSelect}
        size="small"
      />
    );
  } else {
    return (
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        value={columnValue || ""}
        variant="outlined"
        size="small"
        label="Column Value"
        name="columnValue"
        fullWidth
      />
    );
  }
};

const ViewHeaderColumn = ({
  columnValues,
  entityFields,
  setConfirmModalValues,
}) => {
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

  const openConfirmModalToDelete = () => {
    const columnId = columnValues.headerColumnId;
    console.log(columnValues);
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie die Header Spalte löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteViewHeaderColumn(columnId),
    };
    setConfirmModalValues(temp);
  };

  useEffect(() => {
    setColumnFormValues(columnValues);
  }, [columnValues.headerColumnId]);

  return (
    <div className={css.header_column_container}>
      <ElementBadge
        handleClickOnBadge={openConfirmModalToDelete}
        badgeSx={{ marginLeft: "-5px" }}
      >
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={columnFormValues?.columnType}
              label="Spaltentyp"
              name="columnType"
              preferences={{ key: "id", caption: "caption" }}
              options={headerColumnTypes}
              size="small"
            />
            <ColumnValueInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              columnType={columnFormValues?.columnType}
              columnValue={columnFormValues?.columnValue}
              entityFields={entityFields}
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
              type="number"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={columnFormValues?.rowSpan || ""}
              variant="outlined"
              size="small"
              label="Row Span"
              type="number"
              name="rowSpan"
              fullWidth
            />
          </div>
          <div className={css.flex_row}>
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={columnFormValues?.fontFamily}
              label="Font Family"
              name="fontFamily"
              preferences={{ key: "id", caption: "caption" }}
              options={fontFamilies}
              size={"small"}
            />

            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={columnFormValues?.textAlignment}
              label="Ausrichtung"
              name="textAlignment"
              preferences={{ key: "id", caption: "caption" }}
              options={headerColumnTextAlignments}
              size="small"
            />
          </div>
          <div className={css.flex_row}>
            <ColorPicker
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={columnFormValues?.fontColor || "#000000"}
              label="Font Color"
              name="fontColor"
              size="small"
              fullWidth
            />
            <div style={{ width: "100%" }} />
          </div>
        </div>
      </ElementBadge>
    </div>
  );
};

export default ViewHeaderColumn;
