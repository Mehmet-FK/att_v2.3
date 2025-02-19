import css from "@/styles/table-styles/table.module.css";
import RowCell from "./RowCell";
import { useEffect, useState } from "react";
import { TableRow } from "@mui/material";

const CustomTableRow = ({ rowData, widths, columnOptions, colIDs }) => {
  const [rowInfo, setRowInfo] = useState({ keys: colIDs, values: [] });

  const prepareCells = () => {
    let values = [];

    colIDs.forEach((colID) => {
      values.push(rowData[colID]);
    });

    return values;
  };
  /*   const prepareCells = () => {
    let keys = [];
    let values = [];
    for (const cellKey in rowData) {
      keys.push(cellKey);
      values.push(rowData[cellKey]);
    }
    return [keys, values];
  }; */

  /*   useEffect(() => {
    const values = prepareCells();

    setRowInfo((prev) => ({ ...prev, values }));
    // console.log(colIDs);
  }, [colIDs]); */
  return (
    <>
      <TableRow className={css.t_row}>
        {colIDs.map((key) => (
          <RowCell
            colID={key}
            content={rowData[key]}
            widths={widths}
            columnOptions={columnOptions}
          />
        ))}
      </TableRow>
    </>
  );
};

export default CustomTableRow;
