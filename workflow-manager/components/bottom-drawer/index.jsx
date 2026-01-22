import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import DrawerHead from "./DrawerHead";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import { Backdrop, CircularProgress } from "@mui/material";
import DisplaySelectedForm from "@/workflow-manager/components/forms/DisplaySelectedForm";
import HiddenAPIModal from "./HiddenAPIModal";
import SpeedDialTooltipOpen from "@/components/ui-components/CustomSpeedDial";

const defaultOpenHeight = 350;
const minHeight = 45;
const maxHeight = 850;
const drawerHeaderHeight = "25px";

const BottomDrawer = ({
  isLoading,
  onSubmit,
  onExport,
  handleDeleteWorkflow,
  onSave,
  restoreWorkflowFromLocalStorage,
  nodes,
  bottomDrawerExpanded,
  setBottomDrawerExpanded,
}) => {
  const [open, setOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [newHeight, setNewHeight] = useState(45);
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const [openFetchModal, setOpenFetchModal] = useState(false);

  const workflowId = useSelector((state) => state.workflow.workflowId);
  const selectedStepId = useSelector((state) => state.workflow.selectedStepId);

  const resizeStartHeightRef = useRef(null);
  const selectedNodeStoreRef = useRef(selectedStepId);

  const openConfirmModalToDelete = () => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie die aktuelles Workflow löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => handleDeleteWorkflow(),
    };
    setConfirmModalValues(temp);
  };

  const handleClose = () => setOpen(false);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    resizeStartHeightRef.current = newHeight;
  };

  const expandBottomDrawer = () => {
    if (newHeight < 150) {
      setNewHeight(defaultOpenHeight);
    }
  };

  const handleDoubleClick = (e) => {
    if (e.detail >= 2) {
      if (newHeight < 150) {
        setNewHeight(defaultOpenHeight);
      } else {
        setNewHeight(minHeight);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const resizeStartHeight = resizeStartHeightRef.current;
    const offsetY =
      e.clientY - (document.body.offsetHeight - resizeStartHeight);

    const calculatedHeight = resizeStartHeight - offsetY;
    if (calculatedHeight > minHeight && calculatedHeight < maxHeight) {
      setNewHeight(calculatedHeight);
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

  useEffect(() => {
    if (selectedStepId === "") selectedNodeStoreRef.current = selectedStepId;
    if (selectedStepId === selectedNodeStoreRef.current) return;

    selectedNodeStoreRef.current = selectedStepId;
  }, [selectedStepId]);

  useEffect(() => {
    if (bottomDrawerExpanded) {
      expandBottomDrawer();
      setBottomDrawerExpanded(false);
    }
  }, [bottomDrawerExpanded]);

  const findSelectedNode = (_nodes) =>
    _nodes.find((nds) => nds.id === selectedStepId);

  const selectedNode = useMemo(() => findSelectedNode(nodes), [selectedStepId]);
  const drawerHeadLabel = selectedNode
    ? `${selectedNode?.data?.label}: ${selectedNode?.data?.viewId}`
    : `Workflow: ${workflowId}`;

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HiddenAPIModal open={openFetchModal} setOpen={setOpenFetchModal} />
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />
      <Drawer
        anchor={"bottom"}
        variant="persistent"
        PaperProps={{
          overflow: "auto",
          style: { height: newHeight, zIndex: 1200 },
          sx: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            userSelect: "none",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DrawerHead
          handleMouseDown={handleMouseDown}
          handleDoubleClick={handleDoubleClick}
          opacity={newHeight / 150}
          drawerHeaderHeight={drawerHeaderHeight}
          pointerEvents={newHeight < 80 && "none"}
          label={drawerHeadLabel}
          restoreWorkflowFromLocalStorage={restoreWorkflowFromLocalStorage}
          setOpenFetchModal={setOpenFetchModal}
        />
        <Box
          sx={{
            display: newHeight > 100 ? "block" : "none",
            overflow: "auto",
            paddingBlock: "8px",
            height: `calc(100% - ${drawerHeaderHeight})`,
          }}
        >
          <DisplaySelectedForm selectedNode={selectedNode} />
        </Box>
      </Drawer>
    </>
  );
};

export default BottomDrawer;
