import BaseModel from "./BaseModel";

class InfoScreen extends BaseModel {
  constructor({
    infoScreenId = null,
    workflowStepId,
    headerId = null,
    confirmButton = "Ok",
    cancelButton = "Nein",
    submitCache = null,
    title = "",
    infoText = "",
    infoTextVariables = "",
  }) {
    super();

    this.infoScreenId = infoScreenId ?? this.generateId(null, "-info-screen");
    this.workflowStepId = workflowStepId;
    this.headerId = headerId ?? `${this.infoScreenId}-vh`;
    this.confirmButton = confirmButton;
    this.cancelButton = cancelButton;
    this.submitCache = submitCache;
    this.title = title;
    this.infoText = infoText;
    this.infoTextVariables = infoTextVariables;
  }
}

export default InfoScreen;
