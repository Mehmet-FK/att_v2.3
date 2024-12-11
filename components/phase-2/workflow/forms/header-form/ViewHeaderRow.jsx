import css from "@/styles/workflow-forms/header-form.module.css";
import ViewHeaderColumn from "./ViewHeaderColumn";
import { useSelector } from "react-redux";

const ViewHeaderRow = ({ rowId, headerId }) => {
  const { headerColumns } = useSelector((state) => state.workflow);

  const removeRow = () => {
    return null;
  };

  const columns = headerColumns.filter((col) => col.headerRowID === rowId);

  return (
    <div
      className={css.flex_row}
      style={{ position: "relative", columnGap: "0" }}
    >
      <div>
        <span
          title="remove row"
          className={css.remove_row_btn}
          onClick={removeRow}
        >
          ×
        </span>
      </div>
      {columns.map((col) => (
        <ViewHeaderColumn key={col.id} columnValues={col} />
      ))}
    </div>
  );
};

export default ViewHeaderRow;
