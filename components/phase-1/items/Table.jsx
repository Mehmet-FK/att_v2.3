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
import ItemsTableRow from "./ItemsTableRow";
import ContextMenu from "../ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";
import useTable from "@/hooks/useTable";
import useColumns from "@/hooks/useColumns";
import TableUtilities from "@/components/phase-1/table_helpers/TableUtilities";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const ItemsTable = () => {
  // const [itemsData, setItemsData] = useState({ entries: [] }); // Data from Redux Store
  const [itemType, setItemType] = useState("Order");
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [hiddenColumns, setHiddenColumns] = useState([
    "city",
    "country",
    "street",
    "streetnumber",
    "itemType",
    "tagID",
    "zip",
    // "data1",
    // "data2",
    // "data3",
    // "data4",
    // "data5",
  ]); // User preferred not shown Columns

  const [openItemModal, setOpenItemModal] = useState(false);

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
  } = useTable("items");

  const items = useSelector((state) => state.attensam?.data?.items); // Items Data From Redux Store
  const { loading } = useSelector((state) => state.attensam);
  const { paginationParams, sortingParams, filterParams, columnWidths } =
    useSelector(
      (state) => state.tableUtils?.items || state.tableUtils.tableTemplate
    );

  const tableColumns = useMemo(() => {
    if (itemType === "Order") {
      return ItemsTableOrderColumns;
    } else if (itemType === "Meter") {
      return ItemsTableMeterColumns;
    } else if (itemType === "Vehicle") {
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
  }, [paginationParams, sortingParams, filterParams]);

  useEffect(() => {
    adjustColumnWidths(tableRef, shownColumns);
  }, [hiddenColumns, tableColumns, items]);

  // useEffect(() => {
  //   if (!items) return;
  //   setItemsData(items);
  // }, [items]);

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
          //   setOpenColumn={setCheckboxColumn}
          //   openColumn={checkboxColumn}
          // tableColumns={tableColumns}
          setHiddenColumns={setHiddenColumns}
          hiddenColumns={hiddenColumns}
          table="items"
        />
      )}
      <TableContainer
        component={Paper}
        ref={tableRef}
        className={"tab_table_container"}
      >
        <FilterPanel
          type={itemType}
          setType={setItemType}
          fieldsObject={items?.entries[0]}
        />

        <TableUtilities
          table="items"
          totalEntries={items?.totalEntries}
          totalPages={items?.totalPages}
          rawData={items?.entries}
          paginationParams={paginationParams}
          loading={loading}
        />

        <TableHead onContextMenu={(e) => handleRightClick(e, "head")}>
          <TableRow className={"tab_t_row"}>
            {shownColumns?.map((header) => (
              <ColumnHead
                key={header.accessor}
                table={"items"}
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
