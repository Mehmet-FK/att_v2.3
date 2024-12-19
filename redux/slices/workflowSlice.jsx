import { createSlice } from "@reduxjs/toolkit";

const _initialState = {
  selectedStepId: "",
  workflowId: "new-wf",
  entityId: "",
  name: "",
  caption: "",
  description: "",
  icon: "",
  isActive: true,
  isProduction: false,
  permissionType: "0",
  parentWorkflowId: "",
  edges: [],
  nodes: [],
  viewport: {},
  workflowSteps: [],
  launchElements: [],
  scannerDialogs: [],
  listViews: [],
  listViewElements: [],
  listViewElementRows: [],
  recordViews: [],
  recordViewFunctions: [],
  modalDialogs: [],
  headers: [],
  headerRows: [],
  headerColumns: [],
  itemsToDelete: null,
};

const workflowSlice = createSlice({
  name: "workflow",

  initialState: {
    selectedStepId: "",
    workflowId: "new-wf",
    entityId: "",
    name: "",
    caption: "",
    description: "",
    icon: "",
    isActive: true,
    isProduction: false,
    permissionType: "0",
    parentWorkflowId: "",
    edges: [],
    nodes: [],
    viewport: {},
    workflowSteps: [],
    launchElements: [],
    scannerDialogs: [],
    listViews: [],
    listViewElements: [],
    listViewElementRows: [],
    recordViews: [],
    recordViewFunctions: [],
    modalDialogs: [],
    headers: [],
    headerRows: [],
    headerColumns: [],
    itemsToDelete: null,
  },
  reducers: {
    setWorkflowToInitial: () => _initialState,

    updateSelectedStep: (state, { payload: { stepId } }) => {
      if (state.selectedStepId !== stepId) {
        state.selectedStepId = stepId;
      }
    },

    changeNodesEdgesAndViewport: (
      state,
      { payload: { nodes, edges, viewport } }
    ) => {
      state.nodes = nodes;
      state.edges = edges;
      state.viewport = viewport;
    },

    updateTotalWorkflow: (state, { payload: { workflow } }) => {
      for (const key in workflow) {
        if (workflow[key]) {
          state[key] = workflow[key];
        }
      }
    },

    changeWorkflowValue: (state, { payload: { value, name } }) => {
      if (state[name] !== value) {
        state[name] = value;
      }
    },
    addWorkflowStep: (state, { payload: { step } }) => {
      state.workflowSteps.push(step);
    },
    removeWorkflowStep: (state, { payload: { id } }) => {
      state.workflowSteps = state.workflowSteps.filter(
        (step) => step.workflowStepId !== id
      );
    },
    changeNextAndPreviousStep: (
      state,
      { payload: { nextStepId, previousStepId } }
    ) => {
      state.workflowSteps = state.workflowSteps.map((wfs) => {
        if (wfs.workflowStepId === nextStepId) {
          const temp = { ...wfs, previousStep: previousStepId };
          return temp;
        } else if (wfs.workflowStepId === previousStepId) {
          const temp = { ...wfs, nextStep: nextStepId };
          return temp;
        } else {
          return wfs;
        }
      });
    },
    changeWorkflowStepValue: (state, { payload: { name, value, stepId } }) => {
      state.workflowSteps = state.workflowSteps.map((wfs) => {
        if (wfs.workflowStepId === stepId) {
          return { ...wfs, [name]: value };
        } else {
          return wfs;
        }
      });
    },

    addLaunchElement: (state, { payload: { launchElement } }) => {
      state.launchElements.push(launchElement);
    },

    changeLaunchElementValue: (
      state,
      { payload: { name, value, workflowStepId } }
    ) => {
      state.launchElements = state.launchElements.map((launchEl) => {
        if (launchEl.workflowStepId === workflowStepId) {
          return { ...launchEl, [name]: value };
        } else {
          return launchEl;
        }
      });
    },

    removeLaunchElement: (state, { payload: { workflowStepId } }) => {
      state.launchElements = state.launchElements.filter(
        (launchEl) => launchEl.workflowStepId !== workflowStepId
      );
    },

    addRecordView: (state, { payload: { recordView } }) => {
      state.recordViews.push(recordView);
    },
    changeRecordViewValue: (state, { payload: { name, value, viewId } }) => {
      state.recordViews = state.recordViews.map((rv) => {
        if (rv.recordViewId === viewId) {
          return { ...rv, [name]: value };
        } else {
          return rv;
        }
      });
    },

    removeRecordView: (state, { payload: { viewId } }) => {
      state.recordViews = state.recordViews.filter(
        (rv) => rv.recordViewId !== viewId
      );
    },
    addListView: (state, { payload: { listView } }) => {
      state.listViews.push(listView);
    },

    changeListViewValue: (state, { payload: { name, value, viewId } }) => {
      state.listViews = state.listViews.map((lv) => {
        if (lv.listViewId === viewId) {
          return { ...lv, [name]: value };
        } else {
          return lv;
        }
      });
    },
    removeListView: (state, { payload: { viewId } }) => {
      state.listViews = state.listViews.filter(
        (lv) => lv.listViewId !== viewId
      );
    },

    addListViewElement: (state, { payload: { listViewElement } }) => {
      state.listViewElements.push(listViewElement);
    },

    changeListViewElementValue: (
      state,
      { payload: { name, value, elementId } }
    ) => {
      state.listViewElements = state.listViewElements.map((lve) => {
        if (lve.listViewElementId === elementId) {
          return { ...lve, [name]: value };
        } else {
          return lve;
        }
      });
    },

    removeListViewElement: (state, { payload: { elementId } }) => {
      state.listViewElements = state.listViewElements.filter(
        (lve) => lve.listViewElementId !== elementId
      );
    },

    addListViewElementRow: (state, { payload: { elementRow } }) => {
      state.listViewElementRows.push(elementRow);
    },

    changeListViewElementRowValue: (
      state,
      { payload: { name, value, rowId } }
    ) => {
      state.listViewElementRows = state.listViewElementRows.map((lver) => {
        if (lver.listViewElementRowId === rowId) {
          return { ...lver, [name]: value };
        } else {
          return lver;
        }
      });
    },

    removeListViewElementRowByElementId: (
      state,
      { payload: { elementId } }
    ) => {
      state.listViewElementRows = state.listViewElementRows.filter(
        (lver) => lver.listViewElementId !== elementId
      );
    },
    removeListViewElementRowByRowId: (state, { payload: { rowId } }) => {
      state.listViewElementRows = state.listViewElementRows.filter(
        (lver) => lver.listViewElementRowId !== rowId
      );
    },

    addViewHeader: (state, { payload: { viewHeader } }) => {
      state.headers.push(viewHeader);
    },
    changeViewHeaderValue: (
      state,
      { payload: { name, value, viewHeaderId } }
    ) => {
      state.headers = state.headers.map((vh) => {
        if (vh.headerId === viewHeaderId) {
          return { ...vh, [name]: value };
        } else {
          return vh;
        }
      });
    },
    removeViewHeader: (state, { payload: { viewHeaderId } }) => {
      state.headers = state.headers.filter(
        (vh) => vh.headerId !== viewHeaderId
      );
    },
    addViewHeaderRow: (state, { payload: { viewHeaderRow } }) => {
      state.headerRows.push(viewHeaderRow);
    },
    changeViewHeaderRowValue: (
      state,
      { payload: { name, value, viewHeaderRowId } }
    ) => {
      state.headerRows = state.headerRows.map((vhr) => {
        if (vhr.headerRowId === viewHeaderRowId) {
          return { ...vhr, [name]: value };
        } else {
          return vhr;
        }
      });
    },
    removeViewHeaderRow: (state, { payload: { rowId } }) => {
      state.headerRows = state.headerRows.filter(
        (vhr) => vhr.headerRowId !== rowId
      );
      state.headerColumns = state.headerColumns.filter(
        (vhc) => vhc.headerRowID !== rowId
      );
    },

    addViewHeaderColumn: (state, { payload: { viewHeaderColumn } }) => {
      state.headerColumns.push(viewHeaderColumn);
    },

    changeViewHeaderColumnValue: (
      state,
      { payload: { name, value, columnId } }
    ) => {
      state.headerColumns = state.headerColumns.map((vhc) => {
        if (vhc.headerColumnId === columnId) {
          return { ...vhc, [name]: value };
        } else {
          return vhc;
        }
      });
    },

    removeViewHeaderColumn: (state, { payload: { columnId } }) => {
      state.headerColumns = state.headerColumns.filter(
        (vhc) => vhc.headerColumnId !== columnId
      );
    },

    addScannerDialog: (state, { payload: { scannerDialog } }) => {
      state.scannerDialogs.push(scannerDialog);
    },

    changeScannerDialogValue: (
      state,
      { payload: { name, value, dialogId } }
    ) => {
      state.scannerDialogs = state.scannerDialogs.map((sc) => {
        if (sc.scannerDialogId === dialogId) {
          return { ...sc, [name]: value };
        } else {
          return sc;
        }
      });
    },

    removeScannerDialog: (state, { payload: { stepId } }) => {
      state.scannerDialogs = state.scannerDialogs.filter(
        (sc) => sc.workflowStepId !== stepId
      );
    },

    addModalDialog: (state, { payload: { modalDialog } }) => {
      state.modalDialogs.push(modalDialog);
    },

    changeModalDialogValue: (state, { payload: { name, value, modalId } }) => {
      state.modalDialogs = state.modalDialogs.map((md) => {
        if (md.modalDialogId === modalId) {
          return { ...md, [name]: value };
        } else {
          return md;
        }
      });
    },

    removeModalDialog: (state, { payload: { stepId } }) => {
      state.modalDialogs = state.modalDialogs.filter(
        (md) => md.workflowStepId !== stepId
      );
    },
  },
});

export const {
  setWorkflowToInitial,
  addWorkflowStep,
  addLaunchElement,
  addRecordView,
  addListView,
  addListViewElement,
  addListViewElementRow,
  addViewHeader,
  addViewHeaderRow,
  addViewHeaderColumn,
  addScannerDialog,
  addModalDialog,
  changeNodesEdgesAndViewport,
  changeWorkflowValue,
  changeWorkflowStepValue,
  changeNextAndPreviousStep,
  changeLaunchElementValue,
  changeRecordViewValue,
  changeListViewValue,
  changeListViewElementValue,
  changeListViewElementRowValue,
  changeViewHeaderValue,
  changeViewHeaderRowValue,
  changeViewHeaderColumnValue,
  changeScannerDialogValue,
  changeModalDialogValue,
  updateSelectedStep,
  updateTotalWorkflow,
  removeWorkflowStep,
  removeLaunchElement,
  removeListView,
  removeRecordView,
  removeListViewElement,
  removeListViewElementRowByElementId,
  removeListViewElementRowByRowId,
  removeViewHeader,
  removeViewHeaderRow,
  removeViewHeaderColumn,
  removeScannerDialog,
  removeModalDialog,
} = workflowSlice.actions;
export default workflowSlice.reducer;
