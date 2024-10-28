import css from "@/styles/table.module.css";
import RowCell from "../RowCell";
import { TableCell, TableRow } from "@mui/material";
import { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageRow from "./image-row-components/ImageRow";
import BookingModal from "./BookingModal";

const ExpandRowCell = ({ widths, colID, content, open, handleOpen }) => {
  return (
    <TableCell
      className={css.t_data}
      style={{ width: `${widths[colID]}px`, position: "relative" }}
    >
      <IconButton
        aria-label="expand row"
        size="small"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: " translate(-50%, -50%)",
        }}
        onClick={handleOpen}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>

      <span
        style={{
          padding: 0,
          display: "grid",
          placeItems: "center",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          color: "#fff",
          backgroundColor: content > 0 ? "#e14343cc" : "#888d",
          fontSize: "0.6rem",
          position: "absolute",
          left: "57%",
          top: 3,
        }}
      >
        {content}
      </span>
    </TableCell>
  );
};

const BookingsTableRow = ({ rowData, widths, colIDs }) => {
  const [open, setOpen] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenBookingModal(true);
    }
  };

  return (
    <>
      <BookingModal
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
        booking={rowData}
      />
      <TableRow className={css.t_row} onClick={handleDblClick}>
        {colIDs?.map((col) => (
          <Fragment key={col.accessor}>
            {col.accessor === "FileCounter" ? (
              <ExpandRowCell
                open={open}
                handleOpen={handleOpen}
                colID={col.accessor}
                content={rowData[col.accessor]}
                widths={widths}
              />
            ) : (
              <RowCell
                key={col.accessor}
                column={col}
                colID={col.accessor}
                content={rowData[col.accessor]}
                widths={widths}
              />
            )}
          </Fragment>
        ))}
      </TableRow>
      <ImageRow open={open} images={rowData?.Files} />
    </>
  );
};

export default BookingsTableRow;
