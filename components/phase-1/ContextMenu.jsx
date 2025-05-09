import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import useOnClickOutside from "../../hooks/table-hooks/useOnClickOutside";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useContextMenu from "@/hooks/table-hooks/useContextMenu";
import css from "@/styles/menus.module.css";
import { contextMenuConstants, tableNameConstants } from "@/helpers/Constants";
const ColumnMenu = ({ allColumns, setHiddenColumns, hiddenColumns }) => {
  const router = useRouter();

  useEffect(() => {
    return () => {
      localStorage.setItem(
        "hiddenColumns" + router.pathname,
        JSON.stringify(hiddenColumns)
      );
    };
  }, [hiddenColumns]);

  const toggleColumn = (e, column) => {
    const checked = !hiddenColumns.includes(column);

    if (checked) {
      setHiddenColumns((prev) => [...prev, column]);
    } else {
      setHiddenColumns((prev) => prev.filter((c) => c !== column));
    }
  };
  return (
    <Box className={css.item_wrap}>
      {allColumns.map((column, i) => (
        <MenuItem
          key={i}
          sx={{ padding: 0, height: "2rem" }}
          onClick={(e) => toggleColumn(e, column.accessor)}
          name={column.accessor}
        >
          <Checkbox
            size="small"
            checked={!hiddenColumns.includes(column.accessor)}
          />
          <ListItemText sx={{ textTransform: "capitalize" }}>
            <Typography sx={{ fontSize: "0.8rem" }}>{column.Header}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
    </Box>
  );
};

const ContextMenu = ({
  allColumns,
  X,
  Y,
  contextMenu,
  setContextMenu,
  setOpenModal,
  setOpenColumn,
  openColumn,
  setHiddenColumns,
  hiddenColumns,
  setOpenMultiEditModal,
  table,
}) => {
  const [open, setOpen] = useState({
    columns: false,
    something1: false,
    something2: false,
  });
  const { closeContextMenu } = useContextMenu(contextMenu, setContextMenu);

  const contextMenuRef = useRef(null);

  useOnClickOutside(contextMenuRef, closeContextMenu);

  const hideContextMenuIfBodyPointed =
    contextMenu.point === contextMenuConstants.BODY ? "none" : "flex";

  return (
    <Box
      sx={{
        display: hideContextMenuIfBodyPointed,
        top: `${Y}px`,
        left: `${X}px`,
      }}
      className={css.context_menu}
      component={Paper}
      ref={contextMenuRef}
    >
      {contextMenu.point === contextMenuConstants.HEAD && (
        <MenuItem
          sx={{
            width: "100%",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
          size="small"
          onClick={() => setOpen({ ...open, columns: !open.columns })}
        >
          Spalten Verwalten
        </MenuItem>
      )}
      {setOpenModal !== undefined &&
        contextMenu.point === contextMenuConstants.BODY && (
          <>
            {setOpenColumn !== undefined && (
              <>
                <MenuItem
                  sx={{ width: "100%", fontSize: "0.9rem", fontWeight: "600" }}
                  onClick={() => {
                    if (openColumn.isOpen) {
                      setOpenColumn({
                        selectedRows: [],
                        isOpen: false,
                        data: [],
                      });
                    } else {
                      setOpenColumn((prev) => ({ ...prev, isOpen: true }));
                    }
                    closeContextMenu();
                  }}
                >
                  Mehrfache Auswahl
                </MenuItem>

                {table === tableNameConstants.USERS && (
                  <>
                    {openColumn.selectedRows.length > 0 && (
                      <MenuItem
                        onClick={() => setOpenMultiEditModal(true)}
                        sx={{
                          width: "100%",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        }}
                      >
                        Auswahl Bearbeiten
                      </MenuItem>
                    )}
                  </>
                )}
                {table === tableNameConstants.BOOKINGS && (
                  <>
                    {openColumn.selectedRows.length > 0 && (
                      <MenuItem
                        // onClick={() => setOpenMultiEditModal(true)}
                        sx={{
                          width: "100%",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        }}
                      >
                        Importieren
                      </MenuItem>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

      {open.columns && (
        <ColumnMenu
          allColumns={allColumns}
          hiddenColumns={hiddenColumns}
          setHiddenColumns={setHiddenColumns}
        />
      )}
    </Box>
  );
};

export default ContextMenu;
