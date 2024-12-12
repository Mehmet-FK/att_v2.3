import css from "@/styles/workflow-forms/header-form.module.css";
import ViewHeaderColumn from "./ViewHeaderColumn";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ViewHeaderRow = ({ rowId, headerId }) => {
  const { headerColumns } = useSelector((state) => state.workflow);
  const { createViewHeaderColumn, deleteViewHeaderRow } = useWorkflowForms();
  const removeRow = () => {
    deleteViewHeaderRow(rowId);
  };

  const columns = headerColumns.filter((col) => col.headerRowID === rowId);
  const addColumn = () => {
    if (columns.length > 2) return;
    createViewHeaderColumn(rowId);
  };
  return (
    <div
      style={{
        // border: "1px solid red",
        padding: "5px 8px",
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
          <ViewHeaderColumn key={col.id} columnValues={col} />
        ))}
      </div>
      <div style={{ display: "flex", width: "100%", columnGap: "5px" }}>
        <span
          title="add column"
          className={css.add_column_btn}
          onClick={addColumn}
        >
          <AddCircleOutlineIcon fontSize="inherit" />
        </span>
        {/* <span
          title="remove column"
          className={css.remove_column_btn}
          onClick={removeColumn}
        >
          ×
        </span> */}
      </div>
    </div>
  );
};

export default ViewHeaderRow;
