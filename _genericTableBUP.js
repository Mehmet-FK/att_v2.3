import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { Paper, TableBody, TableHead, TableRow } from "@mui/material";
import ColumnHead from "./ColumnHead";
import CustomTableRow from "./CustomTableRow";
import css from "@/styles/table-styles/table.module.css";

const options = {
  hiddenColumns: [],
  sortable: false,
  resizable: false,
  pageSizes: [25, 50, 100, 150, 200],
  defaultPageSize: 25,
  filteredFields: [],
  invisibleFields: [
    "BookingID",
    "ImportState",
    "Files",
    "FileCounter",
    "Data6",
    "Data7",
    "Data8",
    "Data9",
    "Data10",
  ],
};

const columnOptions = {
  style: {
    minWidth: "100px",
  },
  defaultWidth: 150,
};

const Table = () => {
  const [bookings, setBookings] = useState({ entries: [] });
  const [headers, setHeaders] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});

  // extract keys of the first object of data array and ignore unwanted ones according to options object
  const extractHeaders = (data) => {
    return Object.keys(data).filter(
      (el) => !options.invisibleFields.includes(el)
    );
  };

  const initializeColumnWidths = (columns) => {
    const widths = {};
    columns.forEach((col) => (widths[col] = columnOptions.defaultWidth));

    setColumnWidths(widths);
  };

  useEffect(() => {
    (async () => {
      const URL =
        "https://pro.attensam.at/atina/api/AtinaMobileBookings?showPagination=true&";
      try {
        const { data } = await axios(URL);

        setBookings(data);
        if (data.entries[0]) {
          const extractedHeaders = extractHeaders(data.entries[0]);

          setHeaders(extractedHeaders);
          initializeColumnWidths(extractedHeaders);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "90vw",
          height: "90vh",
          paddingBlock: "1rem",
        }}
      >
        <TableHead>
          <TableRow className={css.t_row}>
            {headers.map((header) => (
              <ColumnHead
                key={header}
                colID={header}
                columnOptions={columnOptions}
                content={header}
                widths={columnWidths}
                setWidths={setColumnWidths}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.entries.map((data, index) => (
            <CustomTableRow
              rowData={data}
              colIDs={headers}
              key={index}
              widths={columnWidths}
              columnOptions={columnOptions}
            />
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default Table;
