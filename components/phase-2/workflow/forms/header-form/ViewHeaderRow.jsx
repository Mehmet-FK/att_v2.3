import css from "@/styles/workflow-forms-styles/header-form.module.css";
import ViewHeaderColumn from "./ViewHeaderColumn";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo } from "react";
const ViewHeaderRow = ({ rowId, entityFields, setConfirmModalValues }) => {
  const { headerColumns } = useSelector((state) => state.workflow);
  const { createViewHeaderColumn, deleteViewHeaderRow } = useWorkflowForms();

  const openConfirmModalToDelete = () => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie die Header Zeile mit Spalten löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteViewHeaderRow(rowId),
    };
    setConfirmModalValues(temp);
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
        <ViewHeaderColumn
          key={col.headerColumnId}
          entityFields={entityFields}
          columnValues={col}
          setConfirmModalValues={setConfirmModalValues}
        />
      )),
    [columns, entityFields]
  );

  return (
    <div
      className={css.flex_row}
      style={{
        minHeight: "170px",
      }}
    >
      <div className={css.flex_row}>{MemoViewHeaderColumns}</div>

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
          onClick={openConfirmModalToDelete}
        >
          <DeleteIcon fontSize="inherit" />
        </span>
      </div>
    </div>
  );
};

export default ViewHeaderRow;
