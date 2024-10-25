import css from "@/styles/table.module.css";
import RowCell from "../RowCell";
import { Checkbox, Collapse, TableCell, TableRow } from "@mui/material";
import { useCallback, useState } from "react";

import UserModal from "./UserModal";

const UsersTableRow = ({
  rowData,
  widths,
  colIDs,
  type,
  checkboxColumn,
  setCheckboxColumn,
}) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpenDialog(!openDialog);
  };

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
    }
  };

  const selectRow = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.target.checked) {
        setCheckboxColumn({
          ...checkboxColumn,
          selectedRows: [...checkboxColumn.selectedRows, rowData.userInfo?.id],
          data: [...checkboxColumn.data, rowData],
        });
      } else {
        setCheckboxColumn((prev) => ({
          ...prev,
          selectedRows: [
            ...prev.selectedRows.filter((x) => x !== Number(e.target.value)),
          ],
          data: [
            ...prev.data.filter(
              (u) => u.userInfo.id !== Number(e.target.value)
            ),
          ],
        }));
      }
    },
    [checkboxColumn]
  );
  return (
    <>
      <UserModal
        openUserModal={openUserModal}
        setOpenUserModal={setOpenUserModal}
        userInfo={rowData}
      />
      <TableRow
        className={"tab_t_row"}
        onClick={handleDblClick}
        sx={{
          backgroundColor:
            checkboxColumn.selectedRows.includes(rowData.userInfo?.id) &&
            "#bbbb",
        }}
      >
        <Collapse
          sx={{ p: 0 }}
          orientation="horizontal"
          in={checkboxColumn.isOpen}
        >
          <TableCell
            //className={"tab_t_data"}
            sx={{
              width: "5rem",
              textAlign: "center",
              borderRight: "0.3px solid #ccc",
              // border: "2px solid red",
              height: "100%",
              padding: "9px",
            }}
          >
            <Checkbox
              color="primary"
              size="small"
              sx={{ p: 0 }}
              value={rowData.userInfo?.id}
              checked={checkboxColumn.selectedRows.includes(
                rowData.userInfo?.id
              )}
              // checked={checkboxColumn.selectedRows.includes(
              //   row?.original?.userInfo?.id
              // )}
              onClick={selectRow}
            />
          </TableCell>
        </Collapse>
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
