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
    selectedStepID: "",
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
    updateSelectedStep: (state, { payload: { stepID } }) => {
      state.selectedStepID = stepID;
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
        (step) => step.id !== id
      );
    },
    changeStepValue: (state, { payload: { name, value } }) => {
      state.workflowSteps = state.workflowSteps.map((step) => {
        if (
          step.id === state.selectedStepID &&
          JSON.stringify(step[name]) !== JSON.stringify(value)
        ) {
          return { ...step, [name]: value };
        } else {
          return step;
        }
      });
    },
  },
});

export const {
  updateSelectedStep,
  changeWorkflowValue,
  addWorkflowStep,
  removeWorkflowStep,
  changeStepValue,
  updateTotalWorkflow,
} = workflowSlice.actions;
export default workflowSlice.reducer;
