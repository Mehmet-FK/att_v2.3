import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TableContainer from "@mui/material/TableContainer";
import { Paper, TableBody, TableHead, TableRow } from "@mui/material";
import css from "@/styles/table.module.css";

import FilterPanel from "./FilterPanel";
import useTableDataCalls from "@/hooks/useTableDataCalls";
import ColumnHead from "../ColumnHead";
import { useSelector } from "react-redux";
import BookingsTableRow from "./BookingsTableRow";
import ContextMenu from "../ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";
import useTable from "@/hooks/useTable";
import useColumns from "@/hooks/useColumns";
import TableUtilities from "@/components/phase-1/table_helpers/TableUtilities";
import { contextMenuConstants, tableNameConstants } from "@/helpers/Constants";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const BookingsTable = () => {
  const [bookingsData, setBookingsData] = useState({ entries: [] }); // Data from Redux Store
  const [headers, setHeaders] = useState([]); // Dynamic Headers, extracted from first element of JSON Array
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]); // User preferred not shown Columns
  const [triggerAPICall, setTriggerAPICall] = useState(false);

  const { bookingsTableColumns } = useColumns();
  const { getMobileBookingsData } = useTableDataCalls();
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const {
    initTableUtilsState,
    makeUrlParams,
    handleSortParams,
    initColumnWidths,
    adjustColumnWidths,
    setWidths,
    //* variables
    columnOptions,
  } = useTable(tableNameConstants.BOOKINGS);

  const bookings = useSelector((state) => state.attensam?.data?.bookings); // Bookings Data From Redux Store
  const { loading } = useSelector((state) => state.attensam);

  const { paginationParams, sortingParams, filterParams, columnWidths } =
    useSelector(
      (state) => state.tableUtils?.bookings || state.tableUtils.tableTemplate
    );

  const shownColumns = bookingsTableColumns?.filter(
    (c) => !hiddenColumns.includes(c.accessor)
  ); // visible Columns (columns which hiddenColumns State not includes)

  const tableRef = useRef(null);
  const columnWidthsInitialized = useRef(null);

  const columnWidthInitializedFlag = () =>
    (columnWidthsInitialized.current = true);

  useLayoutEffect(() => {
    initTableUtilsState(tableNameConstants.BOOKINGS);
    initColumnWidths(bookingsTableColumns);
    columnWidthInitializedFlag();
  }, []);

  useEffect(() => {
    const params = makeUrlParams();
    getMobileBookingsData(params + filterParams);
  }, [paginationParams, sortingParams, filterParams, triggerAPICall]);

  useEffect(() => {
    if (columnWidthsInitialized.current) {
      adjustColumnWidths(tableRef, shownColumns);
    }
  }, [columnWidthsInitialized.current, hiddenColumns]);

  useEffect(() => {
    if (!bookings) return;
    setBookingsData(bookings);
  }, [bookings]);

  return (
    <>
      {contextMenu.show && (
        <ContextMenu
          allColumns={bookingsTableColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenBookingModal}
          setHiddenColumns={setHiddenColumns}
          hiddenColumns={hiddenColumns}
          table={tableNameConstants.BOOKINGS}
        />
      )}
      <TableContainer
        component={Paper}
        ref={tableRef}
        className={css.table_container}
      >
        <FilterPanel
          fieldsObject={bookingsData?.entries[0]}
          setTriggerAPICall={setTriggerAPICall}
        />

        <TableUtilities
          table={tableNameConstants.BOOKINGS}
          totalEntries={bookings?.totalEntries}
          totalPages={bookings?.totalPages}
          rawData={bookings?.entries}
          paginationParams={paginationParams}
          loading={loading}
        />

        <TableHead
          onContextMenu={(e) => handleRightClick(e, contextMenuConstants.HEAD)}
        >
          <TableRow className={css.t_row}>
            {shownColumns?.map((header) => (
              <ColumnHead
                key={header.accessor}
                table={tableNameConstants.BOOKINGS}
                colID={header.accessor}
                column={header}
                columnOptions={columnOptions}
                setWidths={setWidths}
                handleSortParams={handleSortParams}
                sortingParams={sortingParams}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsData?.entries.map((data, index) => (
            <BookingsTableRow
              rowData={data}
              colIDs={shownColumns}
              key={index}
              widths={columnWidths}
            />
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default BookingsTable;
