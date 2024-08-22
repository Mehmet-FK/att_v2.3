import {
  initTableState,
  setColumnWidths,
  setCurrentPage,
  setPageSize,
  setSortType,
} from "@/redux/slices/tableUtilsSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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
    "Data6",
    "Data7",
    "Data8",
    "Data9",
    "Data10",
  ],
};

const columnOptions = {
  style: {
    minWidth: "150px",
    // maxWidth: "350px",
  },
  defaultWidth: 150,
};

const useTable = (tabl) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const table = router.query.module || router.pathname.replace("/", "");
  const tableParams = useSelector(
    (state) => state.tableUtils[table] || state.tableUtils.tableTemplate
  );

  const { sortingParams, paginationParams, columnWidths } = tableParams;
  /**
   * Runs when the page called and initializes a state with the name of module which contains
   * table utility parameters like filterParams,  sortingParams, paginationParams
   *
   * @param {String} table
   */
  const initTableUtilsState = () => {
    dispatch(initTableState({ table }));
  };

  // Extract keys of the first object of data array and ignore unwanted ones according to options object
  const extractHeaders = (data) => {
    if (!data) return;
    return Object.keys(data).filter(
      (el) => !options.invisibleFields.includes(el)
    );
  };

  const makeUrlParams = () => {
    let fields = "";
    let directions = "";

    if (Object.keys(sortingParams).length) {
      fields = Object.keys(sortingParams).join("%7C");
      directions = Object.values(sortingParams).join("%7C");
    }

    let params = `pageNumber=${paginationParams.currentPage || 1}&pageSize=${
      paginationParams.pageSize || 25
    }&sortingFields=${fields}&sortingDirections=${directions}`;
    if (params.includes("userInfo.")) {
      params = params.replaceAll("userInfo.", "");
    }
    return params;
  };

  const initColumnWidths = (columns) => {
    console.log(columns);
    if (!columns) return;

    console.log("initColumnWidths Triggered");
    const widths = {};
    columns.forEach((col) => {
      if (col.accessor) {
        console.log(col);
        widths[col.accessor] = columnOptions.defaultWidth;
      } else {
        widths[col] = columnOptions.defaultWidth;
      }
    });
    dispatch(setColumnWidths({ table, widths }));
  };
  // set default width for all visible widths

  const adjustColumnWidths = (tableRef, shownColumns) => {
    console.log("init");
    if (!tableRef || !Object.keys(columnWidths).length) return;
    console.log("adjustColumnWidths");
    const tableWidth = parseInt(getComputedStyle(tableRef.current).width, 10);
    console.log("adjustColumnWidths Triggered");
    const avgWidth = Math.trunc(tableWidth / shownColumns.length) - 2;
    const minWidth = parseInt(columnOptions.style.minWidth, 10);
    if (avgWidth > minWidth && avgWidth < 18000) {
      const widths = { ...columnWidths };
      for (const col in widths) {
        widths[col] = avgWidth;
      }
      const isDifferent =
        JSON.stringify(columnWidths) !== JSON.stringify(widths);
      if (isDifferent) {
        dispatch(setColumnWidths({ table, widths }));
        console.log(columnWidths);
      }
    }
  };
  const setWidths = (cb) => {
    const cbValue = cb(columnWidths);
    dispatch(setColumnWidths({ table, widths: cbValue }));
  };

  //! SORT HANDLING FUNCTIONS

  const singleSort = (column) => {
    if (!sortingParams[column]) {
      const tempObj = { [column]: "asc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else if (sortingParams[column] === "asc") {
      const tempObj = { [column]: "desc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else {
      const tempObj = { ...sortingParams };
      delete tempObj[column];
      dispatch(setSortType({ field: {}, table }));
    }
  };

  const multiSort = (column) => {
    if (!sortingParams[column]) {
      const tempObj = { ...sortingParams, [column]: "asc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else if (sortingParams[column] === "asc") {
      const tempObj = { ...sortingParams, [column]: "desc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else {
      const tempObj = { ...sortingParams, [column]: null };
      dispatch(setSortType({ field: tempObj, table }));
    }
  };

  const handleSortParams = (column, e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    if (e.ctrlKey) {
      multiSort(column);
    } else {
      singleSort(column);
    }
  };

  const handleNextPage = () => {
    dispatch(
      setCurrentPage({ number: paginationParams.currentPage + 1, table })
    );
  };
  const handlePreviousPage = () => {
    dispatch(
      setCurrentPage({ number: paginationParams.currentPage - 1, table })
    );
  };
  const handlePageSize = (size) => {
    dispatch(setPageSize({ size, table }));
  };

  const gotoPage = (pgNumber) => {
    dispatch(setCurrentPage({ number: pgNumber, table }));
  };

  return {
    //functions
    initTableUtilsState,
    initColumnWidths,
    adjustColumnWidths,
    setWidths,
    extractHeaders,
    makeUrlParams,
    handleSortParams,
    handleNextPage,
    handlePreviousPage,
    handlePageSize,
    gotoPage,

    //variables
    columnOptions,
    options,
  };
};

export default useTable;
