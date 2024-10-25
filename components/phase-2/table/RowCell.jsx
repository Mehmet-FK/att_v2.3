import css from "@/styles/table.module.css";
import { TableCell } from "@mui/material";

const RowCell = ({ columnOptions, widths, colID, content }) => {
  const editContent = (content, colID) => {
    let type = "";
    const colIDLowerCase = colID?.toLowerCase();

    if (colIDLowerCase?.includes("date")) type = "DateTime";
    if (colIDLowerCase?.includes("time")) type = "Time";

    let editedContent = "";

    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    switch (type) {
      case "DateTime":
        editedContent = new Date(content).toLocaleDateString(
          "de-AT",
          dateOptions
        );
        break;
      case "Time":
        editedContent = content.substring(0, content.lastIndexOf(":"));
        break;

      default:
        editedContent = content;
        break;
    }

    return editedContent;
  };
  const editedContent = editContent(content, colID);

  return (
    <TableCell
      className={"tab_t_data"}
      style={{
        ...columnOptions?.style,
        width: `${widths[colID]}px`,
        lineHeight: 0.9,
        wordBreak: "break-word",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {editedContent}
    </TableCell>
  );
};

export default RowCell;
