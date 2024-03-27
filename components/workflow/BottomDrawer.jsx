import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import sty from "@/styles/workflow-comp-styles.module.css";

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const BottomDrawer = ({ edges, onSave, onRestore }) => {
  const [open, setOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  // const [lastdownY, setLastdownY] = useState(0);
  const [newHeight, setNewHeight] = useState(35);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);
  const handleMouseDown = (e) => {
    setIsResizing(true);
    // setLastdownY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    let offsetBottom =
      document.body.offsetHeight - (e.clientY - document.body.offsetTop);
    let minHeight = 25;
    let maxHeight = 650;
    if (offsetBottom > minHeight && offsetBottom < maxHeight) {
      setNewHeight(offsetBottom);
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
            zIndex: 300,
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <div onMouseDown={handleMouseDown} className={sty.puller_wrapper}>
          <Puller />
        </div>

        <div
          className={sty.console_btn_wrapper}
          style={{
            display: newHeight > 50 ? "flex" : "none",
          }}
        >
          <div>Lorem ipsum</div>
          <div style={{ display: "flex", columnGap: "15px" }}>
            <div className={sty.console_btn} onClick={() => console.log(edges)}>
              Send
            </div>
            <div className={sty.console_btn} onClick={onSave}>
              Speichern
            </div>
            <div className={sty.console_btn} onClick={onRestore}>
              Restore
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default BottomDrawer;
