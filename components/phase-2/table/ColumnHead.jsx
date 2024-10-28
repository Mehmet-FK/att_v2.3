import { Box, TableCell, TableHead } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import css from "@/styles/table.module.css";
import { useSelector } from "react-redux";
const ColumnHead = ({
  colID,
  content,
  columnOptions,
  widths,
  setWidths,
  table,
}) => {
  const cellRef = useRef(null);
  const isResizing = useRef(null);
  const resizer = useRef(null);

  const [colWidth, setColWidth] = useState(columnOptions.defaultWidth);
  const { columnWidths } = useSelector(
    (state) => state.tableUtils[table] || state.tableUtils.tableTemplate
  );

  useEffect(() => {
    if (!resizer.current || !cellRef.current) return;
    let x = 0;

    const styles = getComputedStyle(cellRef.current);
    let width = parseInt(styles.width, 10);
    const handleMouseDown = (e) => {
      e.stopPropagation();
      isResizing.current = true;
      x = e.clientX;
    };
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const diffX = e.clientX - x;

      x = e.clientX;
      width = width + diffX;
      setColWidth(width);
    };
    const handleMouseUp = (e) => {
      e.stopPropagation();
      isResizing.current = false;
    };

    resizer.current.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (!resizer.current || !cellRef.current) return;
      resizer.current.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!isResizing.current) return;
    setWidths(() => {
      if (colWidth > 150 && colWidth < 800) {
        return {
          ...columnWidths,
          [colID]: colWidth,
        };
      } else {
        return columnWidths;
      }
    });
  }, [colWidth]);

  return (
    <TableCell
      ref={cellRef}
      className={css.t_head}
      style={{
        ...columnOptions?.style,
        width: `${columnWidths[colID]}px`,
      }}
    >
      {content}
      <div ref={resizer} className={css.resizer}></div>
    </TableCell>
  );
};

export default ColumnHead;
