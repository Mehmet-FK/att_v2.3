import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TableContainer from "@mui/material/TableContainer";
import {
  Collapse,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
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
import MultipleEditModal from "./modal-components/MultipleEditModal";

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
  const [openMultiEditModal, setOpenMultiEditModal] = useState(false);

  const [hiddenColumns, setHiddenColumns] = useState([]); // User preferred not shown Columns

  const [checkboxColumn, setCheckboxColumn] = useState({
    isOpen: false,
    selectedRows: [],
    data: [],
  });

  const { usersTableColumns } = useColumns();
  const { getUsersData, getWorkflowsForUserRoles } = useTableDataCalls();
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
    getWorkflowsForUserRoles();
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
      <MultipleEditModal
        setOpenModal={setOpenMultiEditModal}
        openModal={openMultiEditModal}
        checkboxColumn={checkboxColumn}
      />
      {contextMenu.show && (
        <ContextMenu
          allColumns={usersTableColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenUserModal}
          setOpenColumn={setCheckboxColumn}
          openColumn={checkboxColumn}
          setOpenMultiEditModal={setOpenMultiEditModal}
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
            {checkboxColumn && (
              <Collapse
                sx={{ p: 0 }}
                orientation="horizontal"
                in={checkboxColumn.isOpen}
              >
                <Tooltip
                  sx={{ display: !checkboxColumn.isOpen && "none" }}
                  title="Alles abwählen"
                  placement="top"
                  arrow
                >
                  <TableCell
                    sx={{
                      color: "#1976d2",
                      width: "5rem",
                      fontSize: "0.65rem",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      textTransform: "capitalize",
                      fontWeight: "600",
                      // color: "#888",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      borderRight: "0.3px solid #ccc",
                      // borderLeft: "0.4px solid #ccc0",
                      userSelect: "none",
                      padding: "7.5px 0 7.5px 0",
                    }}
                    onClick={(e) => {
                      setCheckboxColumn({
                        isOpen: false,
                        selectedRows: [],
                        data: [],
                      });
                    }}
                  >
                    {checkboxColumn.selectedRows.length} auswahl
                  </TableCell>
                </Tooltip>
              </Collapse>
            )}
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
        <TableBody onContextMenu={(e) => handleRightClick(e, "body")}>
          {usersData?.entries.map((data, index) => (
            <UsersTableRow
              rowData={data}
              colIDs={shownColumns}
              key={index}
              widths={columnWidths}
              checkboxColumn={checkboxColumn}
              setCheckboxColumn={setCheckboxColumn}
            />
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default UsersTable;
