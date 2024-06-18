import { Box, TableCell, TableHead } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CSS from "@/styles/table.module.css";

const getCaption = (colID, data) => data[colID].caption;

const ColumnHead = ({
  colID,
  content,
  columnOptions,
  widths,
  setWidths,
  data,
}) => {
  const cellRef = useRef(null);
  const isResizing = useRef(null);
  const resizer = useRef(null);

  useEffect(() => {
    if (!resizer.current || !cellRef.current) return;

    const styles = getComputedStyle(cellRef.current);
    let width = parseInt(styles.width, 10);
    let x = 0;

    const handleMouseDown = (e) => {
      isResizing.current = true;
      x = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const diffX = e.clientX - x;
      x = e.clientX;
      width = width + diffX;

      setWidths((prev) => ({
        ...prev,
        [colID]:
          width > columnOptions.defaultWidth
            ? width
            : columnOptions.defaultWidth,
      }));
    };
    const handleMouseUp = () => {
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

  const header = getCaption(colID, data);

  return (
    <TableCell
      ref={cellRef}
      className={CSS.t_head}
      style={{
        ...columnOptions?.style,
        width: `${widths[colID]}px`,
      }}
    >
      {header}
      <div ref={resizer} className={CSS.resizer}></div>
    </TableCell>
  );
};

export default ColumnHead;
