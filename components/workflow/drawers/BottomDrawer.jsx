import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import css from "@/styles/workflow-comp-styles.module.css";
import InfoForm from "../InfoForm";

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

const BottomDrawer = ({
  onSave,
  onRestore,
  handleSubmit,
  infoFormValues,
  setInfoFormValues,
  nodes,
}) => {
  const [open, setOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [newHeight, setNewHeight] = useState(45);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);
  const handleMouseDown = (e) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    let offsetBottom =
      document.body.offsetHeight - (e.clientY - document.body.offsetTop);
    let minHeight = 45;
    let maxHeight = 650;
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
  const selectedNode = nodes.find(
    (nds) => nds.type !== "launch" && nds.selected
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
            opacity: newHeight / 250,
            // zIndex: 0,
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          onMouseDown={handleMouseDown}
          onClick={handleDoubleClick}
          className={css.puller_wrapper}
        >
          <Puller />
        </div>
        <div
          className={css.console_btn_wrapper}
          style={{
            display: "flex",
            opacity: newHeight / 150,
          }}
        >
          <div>{selectedNode ? "Step" : "Workflow"}</div>
          <div
            style={{
              display: "flex",
              columnGap: "15px",
              pointerEvents: newHeight < 80 && "none",
            }}
          >
            <div className={css.console_btn} onClick={handleSubmit}>
              Send
            </div>
            <div className={css.console_btn} onClick={onSave}>
              Speichern
            </div>
            <div className={css.console_btn} onClick={onRestore}>
              Restore
            </div>
          </div>
        </div>
        <Box
          sx={{
            display: newHeight > 100 ? "block" : "none",
            maxHeight: newHeight - 100,
          }}
        >
          <InfoForm
            selectedNode={selectedNode}
            infoFormValues={infoFormValues}
            setInfoFormValues={setInfoFormValues}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default BottomDrawer;
