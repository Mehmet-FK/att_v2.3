import css from "@/styles/table-styles/table.module.css";
import { TableCell } from "@mui/material";

const RowCell = ({ widths, colID, column, content }) => {
  return (
    <TableCell
      title={content}
      className={css.t_data}
      style={{
        width: `${widths[colID]}px`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "flex",
      }}
    >
      {column.hasOwnProperty("Cell")
        ? column.Cell({ value: content })
        : content}
    </TableCell>
  );
};

export default RowCell;
