import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TableContainer from "@mui/material/TableContainer";
import { TableBody, TableHead, TableRow } from "@mui/material";
import css from "@/styles/table-styles/table.module.css";
import FilterPanel from "./FilterPanel";
import useTableDataCalls from "@/hooks/remote-api-hooks/useTableDataCalls";
import ColumnHead from "../ColumnHead";
import { useSelector } from "react-redux";
import ItemsTableRow from "./ItemsTableRow";
import ContextMenu from "../ContextMenu";
import useContextMenu from "@/hooks/table-hooks/useContextMenu";
import useTable from "@/hooks/table-hooks/useTable";
import useColumns from "@/hooks/table-hooks/useColumns";
import TableUtilities from "@/components/phase-1/table_helpers/TableUtilities";
import {
  contextMenuConstants,
  itemTableTypeConstants,
  tableNameConstants,
} from "@/helpers/Constants";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const ItemsTable = () => {
  const [itemType, setItemType] = useState(itemTableTypeConstants.ORDER);
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [hiddenColumns, setHiddenColumns] = useState([]); // User preferred not shown Columns

  const [openItemModal, setOpenItemModal] = useState(false);
  const [triggerAPICall, setTriggerAPICall] = useState(false);

  const {
    ItemsTableOrderColumns,
    ItemsTableMeterColumns,
    ItemsTableVehicleColumns,
  } = useColumns();
  const { getAtinaItemsData } = useTableDataCalls();
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const {
    initTableUtilsState,
    makeUrlParams,
    handleSortParams,
    initColumnWidths,
    adjustColumnWidths,
    setWidths,
    //variables
    columnOptions,
  } = useTable(tableNameConstants.ITEMS);

  const items = useSelector((state) => state.attensam?.data?.items); // Items Data From Redux Store
  const loading = useSelector((state) => state.attensam.loading);
  const { paginationParams, sortingParams, filterParams, columnWidths } =
    useSelector(
      (state) => state.tableUtils?.items || state.tableUtils.tableTemplate
    );
  console.log({ items });
  const tableColumns = useMemo(() => {
    if (itemType === itemTableTypeConstants.ORDER) {
      return ItemsTableOrderColumns;
    } else if (itemType === itemTableTypeConstants.METER) {
      return ItemsTableMeterColumns;
    } else if (itemType === itemTableTypeConstants.VEHICLE) {
      return ItemsTableVehicleColumns;
    }
  }, [itemType]);

  const shownColumns = tableColumns?.filter(
    (col) => !hiddenColumns.includes(col.accessor)
  ); // visible Columns (columns which hiddenColumns State not includes)

  const tableRef = useRef(null);

  useLayoutEffect(() => {
    initTableUtilsState();
    initColumnWidths(tableColumns);
  }, []);

  useEffect(() => {
    const params = makeUrlParams();
    getAtinaItemsData(params + filterParams, itemType);
  }, [paginationParams, sortingParams, filterParams, triggerAPICall]);

  useEffect(() => {
    adjustColumnWidths(tableRef, shownColumns);
  }, [hiddenColumns, tableColumns, items]);

  return (
    <>
      {contextMenu.show && (
        <ContextMenu
          allColumns={tableColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenItemModal}
          setHiddenColumns={setHiddenColumns}
          hiddenColumns={hiddenColumns}
          table={tableNameConstants.ITEMS}
        />
      )}
      <TableContainer ref={tableRef} className={css.table_container}>
        <FilterPanel
          type={itemType}
          setType={setItemType}
          fieldsObject={items?.entries[0]}
          setTriggerAPICall={setTriggerAPICall}
        />

        <TableUtilities
          table={tableNameConstants.ITEMS}
          totalEntries={items?.totalEntries}
          totalPages={items?.totalPages}
          rawData={items?.entries}
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
                table={tableNameConstants.ITEMS}
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
          {items?.entries?.map((data, index) => (
            <ItemsTableRow
              key={index}
              rowData={data}
              colIDs={shownColumns}
              widths={columnWidths}
              type={itemType}
            />
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default ItemsTable;
