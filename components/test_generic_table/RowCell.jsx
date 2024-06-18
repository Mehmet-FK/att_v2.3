import css from "@/styles/table.module.css";
import { TableCell } from "@mui/material";
import { useEffect } from "react";

const RowCell = ({ columnOptions, widths, colID, content }) => {
  const editContent = (content) => {
    const type = content?.type;
    const value = content?.value;

    let editedContent = "";

    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    switch (type) {
      case "Date":
        editedContent = new Date(value).toLocaleDateString(
          "de-AT",
          dateOptions
        );
        break;
      case "Time":
        editedContent = value.substring(0, value.lastIndexOf(":"));
        break;

      default:
        editedContent = value;
        break;
    }

    return editedContent;
  };
  const editedContent = editContent(content);

  return (
    <TableCell
      className={css.t_data}
      style={{
        ...columnOptions?.style,
        width: `${widths[colID]}px`,
      }}
    >
      {editedContent}
    </TableCell>
  );
};

export default RowCell;
