import { createSlice } from "@reduxjs/toolkit";

const workflowSlice = createSlice({
  name: "workflow",

  initialState: {
    selectedStepID: "",
    launchType: "",
    caption: "",
    childAdapter: "",
    parentAdapter: "",
    workflowSteps: [],
  },
  reducers: {
    updateSelectedStep: (state, { payload: { stepID } }) => {
      state.selectedStepID = stepID;
    },

    updateTotalWorkflow: (state, { payload: { workflow } }) => {
      for (const key in workflow) {
        console.log(key, "<=>", workflow[key]);
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
        console.log(step.id === state.selectedStepID);
        if (
          step.id === state.selectedStepID &&
          JSON.stringify(step[name]) !== JSON.stringify(value)
        ) {
          return { ...step, [name]: value };
        } else {
          console.log("else block");
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
