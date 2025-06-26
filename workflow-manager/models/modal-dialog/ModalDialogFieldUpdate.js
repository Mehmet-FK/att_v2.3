import BaseModel from "../BaseModel";

class ModalDialogFieldUpdate extends BaseModel {
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
    this.updateFieldName = "";
    this.fieldValue = fieldValue;
    this.conditionFieldId = conditionFieldId;
    this.conditionFieldName = "";
    this.conditionOperator = conditionOperator;
    this.conditionValue = conditionValue;
  }
}

export default ModalDialogFieldUpdate;
