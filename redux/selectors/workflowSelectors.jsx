import { createSelector } from "@reduxjs/toolkit";

const selectWorkflowSteps = (state) => state.workflow.workflowSteps;
const selectRecordViews = (state) => state.workflow.recordViews;

const selectWorkflowStep = (workflowStepId) =>
  createSelector([selectWorkflowSteps], (workflowSteps) => {
    console.log("selectWorkflowStep - selector calculating!");
    const step = workflowSteps.find(
      (step) => step.workflowStepId === workflowStepId
    );
    return step ? step : null;
  });

//SCANNER-DIALOG-
const selectNextStepOfScanner = (workflowStepId) =>
  createSelector([selectWorkflowSteps], (workflowSteps) => {
    console.log("selectNextStepOfScanner - selector calculating!");
    const step = workflowSteps.find(
      (step) => step.workflowStepId === workflowStepId
    );
    return step ? step.nextStep : null;
  });

const selectTargetRecordViewIdOfScanner = (workflowStepId) =>
  createSelector(
    [selectRecordViews, selectNextStepOfScanner(workflowStepId)],
    (recordViews, nextStep) => {
      console.log("selectTargetRecordViewIdOfScanner - selector calculating!");

      if (!nextStep) return null;

      const recordView = recordViews.find(
        (rv) => rv.workflowStepId === nextStep
      );

      return recordView ? recordView.recordViewId : null;
    }
  );

export { selectNextStepOfScanner, selectTargetRecordViewIdOfScanner };
