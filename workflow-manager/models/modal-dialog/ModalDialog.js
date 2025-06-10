import BaseModel from "../BaseModel";

class ModalDialog extends BaseModel {
  constructor({
    modalDialogId = null,
    workflowStepId,
    caption = "",
    userText = "",
    fieldId = 0,
    newValue = "",
    okButton = "Ja",
    cancelButton = "Nein",
    fieldUpdates = [],
    userTexts = [],
    nextStepOnConfirm = "",
    nextStepOnCancel = "",
  }) {
    super();

    this.modalDialogId = modalDialogId ?? this.generateId(null, "-modal");
    this.workflowStepId = workflowStepId;
    this.userText = userText;
    this.fieldId = fieldId;
    this.newValue = newValue;
    this.okButton = okButton;
    this.cancelButton = cancelButton;
    this.caption = caption;
    this.nextStepOnConfirm = nextStepOnConfirm;
    this.nextStepOnCancel = nextStepOnCancel;

    this.userTexts = userTexts;
    this.fieldUpdates = fieldUpdates;
  }
}

export default ModalDialog;
