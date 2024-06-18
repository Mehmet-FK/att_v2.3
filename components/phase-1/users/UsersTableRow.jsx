import css from "@/styles/table.module.css";
import RowCell from "../RowCell";
import { TableRow } from "@mui/material";
import { useState } from "react";

import UserModal from "./UserModal";

const UsersTableRow = ({ rowData, widths, colIDs, type }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpenDialog(!openDialog);
  };

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      console.log(colIDs);
      setOpenUserModal(true);
    }
  };

  return (
    <>
      <UserModal
        openUserModal={openUserModal}
        setOpenUserModal={setOpenUserModal}
        userInfo={rowData}
      />
      <TableRow className={css.t_row} onClick={handleDblClick}>
        {colIDs?.map((col) => (
          <RowCell
            key={col.accessor}
            column={col}
            colID={col.accessor}
            content={rowData.userInfo[col.accessor]}
            widths={widths}
          />
        ))}
      </TableRow>
    </>
  );
};

export default UsersTableRow;
