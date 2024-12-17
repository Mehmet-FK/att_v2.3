import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import css from "@/styles/workflow-comp-styles.module.css";

import { useSelector } from "react-redux";
import DisplaySelectedForm from "./DisplaySelectedForm";

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  zIndex: 10,
}));

const BottomDrawer = ({ onSubmit, onSave, onRestore, nodes }) => {
  const [open, setOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [newHeight, setNewHeight] = useState(45);
  // const workflow = useSelector((state) => state.workflow);

  const handleClose = () => setOpen(false);
  const handleMouseDown = (e) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    let offsetBottom =
      document.body.offsetHeight - (e.clientY - document.body.offsetTop);
    let minHeight = 45;
    let maxHeight = 850;
    if (offsetBottom > minHeight && offsetBottom < maxHeight) {
      setNewHeight(offsetBottom);
    }
  };

  const handleDoubleClick = (e) => {
    if (e.detail === 2) {
      if (newHeight < 150) setNewHeight(350);
      else setNewHeight(45);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });
  const selectedNode = useMemo(
    () => nodes.find((nds) => nds.selected),
    [nodes]
  );
  return (
    <>
      <Drawer
        anchor={"bottom"}
        variant="persistent"
        PaperProps={{
          overflow: "auto",
          style: { height: newHeight, zIndex: 3000 },
          sx: {
            height: 100,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            opacity: newHeight / 150,
            userSelect: "none",
            // zIndex: 0,
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          className={css.fixed_tab + " " + css.puller_wrapper}
          onMouseDown={handleMouseDown}
          onClick={handleDoubleClick}
        >
          <div>
            <Puller />
          </div>

          <div
            className={css.console_btn_wrapper}
            style={{
              display: "flex",
              opacity: newHeight / 150,
            }}
          >
            <div style={{ userSelect: "none", color: "#f00" }}>
              {selectedNode ? selectedNode?.data?.label : "Workflow"}
            </div>
            <div
              style={{
                display: "flex",
                columnGap: "15px",
                pointerEvents: newHeight < 80 && "none",
              }}
            >
              <div
                className={css.console_btn}
                style={{ userSelect: "none", color: "#000" }}
                onClick={onSubmit}
              >
                Send
              </div>
              <div
                className={css.console_btn}
                style={{ userSelect: "none", color: "#000" }}
                onClick={onSave}
              >
                Speichern
              </div>
              <div
                className={css.console_btn}
                style={{ userSelect: "none", color: "#000" }}
                onClick={onRestore}
              >
                Restore
              </div>
            </div>
          </div>
        </div>
        <Box
          sx={{
            display: newHeight > 100 ? "block" : "none",
            maxHeight: newHeight - 100,
          }}
        >
          <DisplaySelectedForm
            selectedNode={selectedNode}
            // infoFormValues={infoFormValues}
            // setInfoFormValues={setInfoFormValues}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default BottomDrawer;