import BaseModel from "./BaseModel";

class LaunchElement extends BaseModel {
  constructor({
    launchElementId = null,
    workflowStepId,
    launchType,
    name = null,
    description = "",
  }) {
    super();

    this.launchElementId = launchElementId ?? this.generateId(null, "-launch");
    this.workflowStepId = workflowStepId;
    this.launchType = launchType;
    this.name = name ?? workflowStepId;
    this.description = description;
  }
}
export default LaunchElement;
