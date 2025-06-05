import BaseModel from "./BaseModel";

class WorkflowStep extends BaseModel {
  constructor({
    workflowStepId,
    workflowId,
    name = null,
    nextStep = "",
    previousStep = "",
  }) {
    super();
    this.workflowStepId = workflowStepId;
    this.workflowID = workflowId;
    this.name = name ?? workflowStepId;
    this.nextStep = nextStep;
    this.previousStep = previousStep;
  }
}

export default WorkflowStep;
