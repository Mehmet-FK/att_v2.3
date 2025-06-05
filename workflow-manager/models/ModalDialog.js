import BaseModel from "./BaseModel";

export class ModalDialogUserText extends BaseModel {
  constructor({
    modalDialogUserTextId = null,
    conditionFieldId = 0,
    conditionOperator = "",
    conditionValue = "",
    userText = "",
  }) {
    super();
    this.modalDialogUserTextId =
      modalDialogUserTextId ?? this.generateId("user-text-", null);
    this.conditionFieldId = conditionFieldId;
    this.conditionOperator = conditionOperator;
    this.conditionValue = conditionValue;
    this.userText = userText;
  }
}

export class ModalDialogFieldUpdate extends BaseModel {
  constructor({
    modalDialogFieldId = null,
    hasCondition = false,
    updateFieldId = 0,
    fieldValue = "",
    conditionFieldId = null,
    conditionOperator = null,
    conditionValue = null,
  }) {
    super();
    this.modalDialogFieldId =
      modalDialogFieldId ?? this.generateId("dialog-field-", null);
    this.hasCondition = hasCondition;
    this.updateFieldId = updateFieldId;
    this.fieldValue = fieldValue;
    this.conditionFieldId = conditionFieldId;
    this.conditionOperator = conditionOperator;
    this.conditionValue = conditionValue;
  }
}

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
