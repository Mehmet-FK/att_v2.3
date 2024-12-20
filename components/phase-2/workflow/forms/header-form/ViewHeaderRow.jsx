import css from "@/styles/workflow-forms/header-form.module.css";
import ViewHeaderColumn from "./ViewHeaderColumn";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo } from "react";
import { Divider } from "@mui/material";

const ViewHeaderRow = ({ rowId }) => {
  const { headerColumns } = useSelector((state) => state.workflow);
  const { createViewHeaderColumn, deleteViewHeaderRow } = useWorkflowForms();
  const removeRowOnDoubleClick = (e) => {
    if (e.detail < 2) return;

    deleteViewHeaderRow(rowId);
  };

  const columns = useMemo(
    () => headerColumns.filter((col) => col.headerRowID === rowId),
    [headerColumns, rowId]
  );
  const addColumn = () => {
    if (columns.length > 2) return;
    createViewHeaderColumn(rowId);
  };

  const MemoViewHeaderColumns = useMemo(
    () =>
      columns.map((col) => (
        <ViewHeaderColumn key={col.headerColumnId} columnValues={col} />
      )),
    [columns]
  );

  return (
    <>
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
            justifyContent: "space-between",
            minHeight: "170px",
          }}
        >
          {MemoViewHeaderColumns}
          <span />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              width: "40px",
              rowGap: "5px",
            }}
          >
            <span
              title="Spalte hinzufügen"
              className={`${css.add_column_btn} ${css.column_button}`}
              onClick={addColumn}
            >
              <AddCircleOutlineIcon fontSize="inherit" />
            </span>

            <span
              title="Zeile löschen"
              className={`${css.remove_row_btn} ${css.column_button}`}
              onClick={removeRowOnDoubleClick}
            >
              <DeleteIcon fontSize="inherit" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHeaderRow;
