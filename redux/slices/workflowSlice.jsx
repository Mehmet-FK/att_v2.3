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
      //TODO: Delete All ListView, ListViewElements, ListViewElementRows, ListViewHeader, WorkflowStep
      //TODO: Update previousStep, nextStep values of WorkflowSteps
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
    deleteViewHeader: (state, { payload: { viewHeaderId } }) => {
      //TODO: Delete All ViewHeader, ViewHeaderRows, ViewHeaderColumns
    },
    addViewHeaderRow: (state, { payload: { viewHeaderRow } }) => {
      state.headerRows = [...state.headerRows, viewHeaderRow];
    },
    changeViewHeaderRowValue: (
      state,
      { payload: { name, value, viewHeaderRowId } }
    ) => {
      state.headerRows = state.headerRows.map((vhr) => {
        if (vhr.rowId === viewHeaderRowId) {
          return { ...vhr, [name]: value };
        } else {
          return vhr;
        }
      });
    },
    deleteViewHeaderRow: (state, { payload: { viewHeaderRowId } }) => {
      //TODO: Delete All ViewHeaderRows, ViewHeaderColumns
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
    deleteViewHeaderColumn: (state, { payload: { viewHeaderColumnId } }) => {
      //TODO: Delete All ViewHeaderRows, ViewHeaderColumns
    },
  },
});

export const {
  addWorkflowStep,
  addListView,
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
} = workflowSlice.actions;
export default workflowSlice.reducer;
