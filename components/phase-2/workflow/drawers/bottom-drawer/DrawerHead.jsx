import css from "@/styles/workflow-comp-styles.module.css";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

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

const DrawerHead = ({
  onSubmit,
  onSave,
  restoreWorkflowFromLocalStorage,
  handleMouseDown,
  handleDoubleClick,
  pointerEvents,
  label,
  drawerHeaderHeight,
}) => {
  return (
    <div
      className={css.fixed_tab}
      onMouseDown={handleMouseDown}
      onClick={handleDoubleClick}
      style={{ height: drawerHeaderHeight + "px" }}
    >
      <Puller />

      <div
        className={css.console_btn_wrapper}
        style={{
          display: "flex",
        }}
      >
        <div style={{ userSelect: "none", fontStyle: "italic" }}>{label}</div>
        <div
          style={{
            display: "flex",
            columnGap: "15px",
            pointerEvents: pointerEvents,
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
            onClick={restoreWorkflowFromLocalStorage}
          >
            Restore
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerHead;
