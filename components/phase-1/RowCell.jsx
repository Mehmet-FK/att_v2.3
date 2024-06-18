import css from "@/styles/table.module.css";
import { TableCell } from "@mui/material";

const RowCell = ({ widths, colID, column, content }) => {
  // console.log(content);
  return (
    <TableCell
      title={content}
      className={css.t_data}
      style={{
        width: `${widths[colID]}px`,
      }}
    >
      {column.hasOwnProperty("Cell")
        ? column.Cell({ value: content })
        : content}
    </TableCell>
  );
};

export default RowCell;
