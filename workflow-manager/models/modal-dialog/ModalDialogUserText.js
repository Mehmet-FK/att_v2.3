import BaseModel from "../BaseModel";

class ModalDialogUserText extends BaseModel {
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
    this.conditionFieldName = "";
    this.conditionOperator = conditionOperator;
    this.conditionValue = conditionValue;
    this.userText = userText;
  }
}

export default ModalDialogUserText;
