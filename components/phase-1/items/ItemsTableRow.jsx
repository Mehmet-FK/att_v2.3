import css from "@/styles/table-styles/table.module.css";
import RowCell from "../RowCell";
import { TableRow } from "@mui/material";
import { useState } from "react";

import ItemModal from "./ItemModal";

const ItemsTableRow = ({ rowData, widths, colIDs, type }) => {
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpenDialog(!openDialog);
  };

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenItemsModal(true);
    }
  };

  return (
    <>
      <ItemModal
        openItemsModal={openItemsModal}
        setOpenItemsModal={setOpenItemsModal}
        item={rowData}
        type={type}
      />
      <TableRow className={css.t_row} onClick={handleDblClick}>
        {colIDs?.map((col) => (
          <RowCell
            key={col.accessor}
            column={col}
            colID={col.accessor}
            content={rowData[col.accessor]}
            widths={widths}
          />
        ))}
      </TableRow>
    </>
  );
};

export default ItemsTableRow;
