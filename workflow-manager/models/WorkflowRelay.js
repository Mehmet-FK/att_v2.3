import BaseModel from "./BaseModel";

class WorkflowRelay extends BaseModel {
  constructor({
    workflowRelayId = null,
    workflowStepId,
    workflowHubStepId = "",
  }) {
    super();
    this.workflowRelayId = workflowRelayId ?? this.generateId(null, "-relay");
    this.workflowStepId = workflowStepId;
    this.workflowHubStepId = workflowHubStepId;
  }
}

export default WorkflowRelay;
