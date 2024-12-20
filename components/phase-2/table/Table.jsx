import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { Paper, TableBody, TableHead, TableRow } from "@mui/material";
import ColumnHead from "./ColumnHead";
import CustomTableRow from "./CustomTableRow";
import css from "@/styles/table.module.css";
import { contextMenuConstants } from "@/helpers/Constants";
import useContextMenu from "@/hooks/table-hooks/useContextMenu";
import useTable from "@/hooks/table-hooks/useTable";
import ContextMenu from "@/components/phase-2/table/table_helpers/ContextMenu";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import FilterPanel from "./table_helpers/FilterPanel";
import TableUtilities from "./table_helpers/TableUtilities";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const Table = () => {
  const router = useRouter();

  const [dataSets, setDataSets] = useState({ entries: [] });
  const [headers, setHeaders] = useState([]);

  const [hiddenColumns, setHiddenColumns] = useState([]); // User preferred not shown Columns
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [openContextMenu, setOpenContextMenu] = useState(false);

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  const tableRef = useRef(null);
  const columnWidthsInitialized = useRef(null);

  const module = router.query.module;

  const {
    initTableUtilsState,
    makeUrlParams,
    handleSortParams,
    initColumnWidths,
    adjustColumnWidths,
    setWidths,
    //* variables
    columnOptions,
  } = useTable(module);

  // const { loading } = useSelector((state) => state.attensam);

  const { paginationParams, sortingParams, filterParams, columnWidths } =
    useSelector(
      (state) => state.tableUtils[module] || state.tableUtils.tableTemplate
    );

  const shownColumns = headers?.filter((c) => !hiddenColumns.includes(c)); // visible Columns (columns which hiddenColumns State not includes)

  const extractHeaders = (data) => {
    return Object.keys(data).filter((el) => data[el].isVisible);
  };

  // useLayoutEffect(() => {
  //   const dataArray = [
  //     dummyDataItems,
  //     dummyDataBookings,
  //     dummyData1,
  //     dummyData1,
  //     dummyDataBookings,
  //     dummyData1,
  //     dummyDataItems,
  //     dummyDataItems,
  //   ];
  //   const randomIndex = Math.floor(Math.random() * 8);
  //   const data = dataArray[randomIndex];
  //   setTimeout(() => {
  //     setDataSets(data);
  //   }, 500);
  //   if (data) {
  //     const extractedHeaders = extractHeaders(data.fields);
  //     setHeaders(extractedHeaders);
  //   }
  // }, []);

  useEffect(() => {
    if (!dataSets?.fields) return;
    initTableUtilsState();

    initColumnWidths(headers);
    columnWidthsInitialized.current = true;
  }, [dataSets?.fields, module]);

  useEffect(() => {
    if (columnWidthsInitialized.current) {
      adjustColumnWidths(tableRef, shownColumns);
    }
  }, [columnWidthsInitialized.current, hiddenColumns]);

  return (
    <>
      {contextMenu.show && (
        <ContextMenu
          allColumns={Object.values(dataSets.fields)}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenContextMenu}
          setHiddenColumns={setHiddenColumns}
          hiddenColumns={hiddenColumns}
        />
      )}
      <TableContainer
        component={Paper}
        ref={tableRef}
        className={css.table_container}
      >
        <FilterPanel fieldsObject={dataSets.fields || {}} module={module} />

        <TableUtilities
          totalEntries={dataSets?.totalEntries}
          totalPages={dataSets?.totalPages}
          rawData={dataSets}
          paginationParams={paginationParams}
        />

        <TableHead
          onContextMenu={(e) => handleRightClick(e, contextMenuConstants.HEAD)}
        >
          <TableRow className={css.t_row}>
            {shownColumns.map((header) => (
              <ColumnHead
                key={header}
                table={module}
                colID={header}
                columnOptions={columnOptions}
                content={
                  dataSets?.fields ? dataSets?.fields[header].caption : ""
                }
                // widths={columnWidths}
                setWidths={setWidths}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSets.entries.map((data, index) => (
            <CustomTableRow
              rowData={data}
              colIDs={shownColumns}
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
