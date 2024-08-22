import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import useContextMenu from "@/hooks/useContextMenu";
import css from "@/styles/menus.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside";
const ColumnMenu = ({ allColumns, setHiddenColumns, hiddenColumns }) => {
  const router = useRouter();

  useEffect(() => {
    return () => {
      localStorage.setItem(
        "hiddenColumns/" + router.query.module,
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
      {allColumns.map(
        (column, i) =>
          column.isVisible && (
            <MenuItem
              key={i}
              sx={{ padding: 0, height: "2rem" }}
              onClick={(e) => toggleColumn(e, column.name)}
              name={column.name}
            >
              <Checkbox
                size="small"
                checked={!hiddenColumns.includes(column.name)}
              />
              <ListItemText sx={{ textTransform: "capitalize" }}>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  {column.caption}
                </Typography>
              </ListItemText>
            </MenuItem>
          )
      )}
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
  setHiddenColumns,
  hiddenColumns,
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
  return (
    <Box
      sx={{
        display: contextMenu.point === "body" ? "none" : "flex",
        top: `${Y}px`,
        left: `${X}px`,
      }}
      className={css.context_menu}
      component={Paper}
      ref={contextMenuRef}
    >
      {contextMenu.point === "head" && (
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
      {setOpenModal !== undefined && contextMenu.point === "body" && (
        <>
          <MenuItem
            sx={{ width: "100%", fontSize: "0.9rem", fontWeight: "600" }}
            onClick={() => setOpenModal(true)}
          >
            Neu Anlegen
          </MenuItem>
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
