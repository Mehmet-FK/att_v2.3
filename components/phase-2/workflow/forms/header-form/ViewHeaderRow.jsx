import css from "@/styles/workflow-forms/header-form.module.css";
import ViewHeaderColumn from "./ViewHeaderColumn";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useMemo } from "react";

const ViewHeaderRow = ({ rowId, headerId }) => {
  const { headerColumns } = useSelector((state) => state.workflow);
  const { createViewHeaderColumn, deleteViewHeaderRow } = useWorkflowForms();
  const removeRow = () => {
    deleteViewHeaderRow(rowId);
  };

  const columns = useMemo(
    () => headerColumns.filter((col) => col.headerRowID === rowId),
    [headerColumns, headerId]
  );
  const addColumn = () => {
    if (columns.length > 2) return;
    createViewHeaderColumn(rowId);
  };

  return (
    <div
      style={{
        padding: "5px 8px 0 8px",
      }}
    >
      <div
        className={css.flex_row}
        style={{
          position: "relative",
          columnGap: "10px",
        }}
      >
        <div>
          <span
            title="remove row"
            className={css.remove_row_btn}
            onClick={removeRow}
          >
            <HighlightOffIcon fontSize="inherit" />
          </span>
        </div>
        {columns.map((col) => (
          <ViewHeaderColumn key={col.headerColumnId} columnValues={col} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          columnGap: "5px",
          paddingBlock: "10px",
        }}
      >
        <span
          title="add column"
          className={css.add_column_btn}
          onClick={addColumn}
        >
          <AddCircleOutlineIcon fontSize="inherit" />
        </span>
      </div>
    </div>
  );
};

export default ViewHeaderRow;
