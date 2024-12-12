import { createSlice } from "@reduxjs/toolkit";

/*
============BACKUP============
initialState: {
  selectedStepID: "",
  workflowName: "",
  workflowCaption: "",
  workflowIcon: "",
  permissionType: "",
  parentWorkflowId: "",
  entityId: "",
  launchElementName: "",
  launchElementDescription: "",
  launchElementType: "",
  caption: "",
  childAdapter: "",
  parentAdapter: "",
  workflowSteps: [],
  ============BACKUP============
}, */

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
    edges: "",
    nodes: "",
    viewport: "",
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
    updateSelectedStep: (state, { payload: { stepId } }) => {
      state.selectedStepId = stepId;
    },

    updateTotalWorkflow: (state, { payload: { workflow } }) => {
      for (const key in workflow) {
        if (workflow[key]) {
          state[key] = workflow[key];
        }
      }
    },

    changeWorkflowValue: (state, { payload: { value, name } }) => {
      state[name] = value;
    },
    addWorkflowStep: (state, { payload: { step } }) => {
      state.workflowSteps = [...state.workflowSteps, step];
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
    changeStepValue: (state, { payload: { name, value } }) => {
      state.workflowSteps = state.workflowSteps.map((step) => {
        if (
          step.workflowStepId === state.selectedStepId &&
          JSON.stringify(step[name]) !== JSON.stringify(value)
        ) {
          return { ...step, [name]: value };
        } else {
          return step;
        }
      });
    },
    addListView: (state, { payload: { listView } }) => {
      state.listViews = [...state.listViews, listView];
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
      state.listViewElements = [...state.listViewElements, listViewElement];
    },

    removeListViewElement: (state, { payload: { elementId } }) => {
      state.listViewElements = state.listViewElements.filter(
        (lve) => lve.listViewElementId !== elementId
      );
    },

    addListViewElementRow: (state, { payload: { elementRow } }) => {
      state.listViewElementRows = [...state.listViewElementRows, elementRow];
    },
    removeListViewElementRow: (state, { payload: { elementId } }) => {
      state.listViewElementRows = state.listViewElementRows.filter(
        (lver) => lver.listViewElementId !== elementId
      );
    },

    addViewHeader: (state, { payload: { viewHeader } }) => {
      state.headers = [...state.headers, viewHeader];
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
      state.headerRows = [...state.headerRows, viewHeaderRow];
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
      state.headerColumns = [...state.headerColumns, viewHeaderColumn];
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
  },
});

export const {
  addWorkflowStep,
  addListView,
  addListViewElement,
  addListViewElementRow,
  addViewHeader,
  addViewHeaderRow,
  addViewHeaderColumn,
  changeWorkflowValue,
  changeNextAndPreviousStep,
  changeStepValue,
  changeListViewValue,
  changeViewHeaderValue,
  changeViewHeaderRowValue,
  changeViewHeaderColumnValue,
  updateSelectedStep,
  updateTotalWorkflow,
  removeWorkflowStep,
  removeListView,
  removeListViewElement,
  removeListViewElementRow,
  removeViewHeader,
  removeViewHeaderRow,
  removeViewHeaderColumn,
} = workflowSlice.actions;
export default workflowSlice.reducer;
