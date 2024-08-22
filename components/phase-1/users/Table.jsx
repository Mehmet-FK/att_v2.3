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
// import BookingsTableRow from "./BookingsTableRow";
import ContextMenu from "../ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";
import useTable from "@/hooks/useTable";
import useColumns from "@/hooks/useColumns";
import UsersTableRow from "./UsersTableRow";
import TableUtilities from "@/components/phase-1/table_helpers/TableUtilities";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const UsersTable = () => {
  const [usersData, setUsersData] = useState({ entries: [] }); // Data from Redux Store
  const [headers, setHeaders] = useState([]); // Dynamic Headers, extracted from first element of JSON Array
  // const [columnWidths, setColumnWidths] = useState({}); // Column Resize widths
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [openUserModal, setOpenUserModal] = useState(false);

  const [hiddenColumns, setHiddenColumns] = useState([]); // User preferred not shown Columns

  const { usersTableColumns } = useColumns();
  const { getUsersData } = useTableDataCalls();
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
  } = useTable("users");

  const users = useSelector((state) => state.attensam?.data?.users); // Users Data From Redux Store
  const { loading } = useSelector((state) => state.attensam);

  const { paginationParams, sortingParams, filterParams, columnWidths } =
    useSelector(
      (state) => state.tableUtils?.users || state.tableUtils.tableTemplate
    );

  const shownColumns = usersTableColumns?.filter(
    (c) => !hiddenColumns.includes(c.accessor)
  ); // visible Columns (columns which hiddenColumns State not includes)

  const tableRef = useRef(null);

  useLayoutEffect(() => {
    initTableUtilsState();
    initColumnWidths(usersTableColumns);
  }, []);

  useEffect(() => {
    const params = makeUrlParams();
    getUsersData(params + filterParams);
  }, [paginationParams, sortingParams, filterParams]);

  useEffect(() => {
    adjustColumnWidths(tableRef, shownColumns);
  }, [hiddenColumns, usersData]);

  useEffect(() => {
    if (!users) return;
    setUsersData(users);
  }, [users]);
  return (
    <>
      {contextMenu.show && (
        <ContextMenu
          allColumns={usersTableColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenUserModal}
          //   setOpenColumn={setCheckboxColumn}
          //   openColumn={checkboxColumn}
          // tableColumns={tableColumns}
          setHiddenColumns={setHiddenColumns}
          hiddenColumns={hiddenColumns}
          table="users"
        />
      )}
      <TableContainer
        component={Paper}
        ref={tableRef}
        className={css.table_container}
      >
        <FilterPanel fieldsObject={users?.entries[0]} />

        <TableUtilities
          table="users"
          totalEntries={users?.totalEntries}
          totalPages={users?.totalPages}
          rawData={users?.entries}
          paginationParams={paginationParams}
          loading={loading}
        />

        <TableHead onContextMenu={(e) => handleRightClick(e, "head")}>
          <TableRow className={css.t_row}>
            {shownColumns?.map((header) => (
              <ColumnHead
                key={header.accessor}
                table={"users"}
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
          {usersData?.entries.map((data, index) => (
            <UsersTableRow
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

export default UsersTable;
