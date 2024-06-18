import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { Paper, TableBody, TableHead, TableRow } from "@mui/material";
import ColumnHead from "./ColumnHead";
import CustomTableRow from "./CustomTableRow";
import css from "@/styles/table.module.css";

//TODO: the Import below is only for testing do not forget to delete
import { dummyData } from "@/helpers/Constants";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import FilterPanel from "./FilterPanel";

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
    "UserId",
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
  //TODO: redux functions are only for testing until the api call hook will be created
  const dispatch = useDispatch();

  //TODO END:

  // extract keys of the first object of data array and ignore unwanted ones according to options object
  const extractHeaders = (data) => {
    return Object.keys(data).filter(
      (el) => data[el].isVisible && !options.invisibleFields.includes(el)
    );
  };

  // set default width for all visible widths
  const initializeColumnWidths = (columns) => {
    const widths = {};
    columns.forEach((col) => (widths[col] = columnOptions.defaultWidth));

    setColumnWidths(widths);
  };

  useEffect(() => {
    //Start fetching
    dispatch(fetchStart());
    //set data
    setBookings({
      ...dummyData,
      entries: [
        ...dummyData.entries,
        ...dummyData.entries,
        ...dummyData.entries,
        ...dummyData.entries,
      ],
    });
    //set data to redux store
    dispatch(getSuccess({ data: dummyData, dataName: "bookings" }));
    const extractedHeaders = extractHeaders(dummyData.entries[0]);
    setHeaders(extractedHeaders);
    // console.log(extractedHeaders);
    initializeColumnWidths(extractedHeaders);
    // stop loading
    dispatch(stopLoading());
  }, []);
  return (
    <>
      <TableContainer
        component={Paper}
        className={css.table_container}
        /* sx={{
          width: "90vw",
          height: "90vh",
          paddingBlock: "1rem",
        }} */
      >
        <FilterPanel fieldsObject={bookings.entries[0]} headers={headers} />

        <TableHead>
          <TableRow className={css.t_row}>
            {headers.map((header) => (
              <ColumnHead
                key={header}
                colID={header}
                columnOptions={columnOptions}
                content={header}
                data={bookings?.entries[0]}
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
