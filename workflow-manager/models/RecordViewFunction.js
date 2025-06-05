import BaseModel from "./BaseModel";

class RecordViewFunction extends BaseModel {
  constructor({
    recordViewFunctionId,
    recordViewId,
    workflowId = null,
    functionCaption = "",
    sortOrder = 0,
    isDraggedOver = false,
  }) {
    super();
    this.recordViewFunctionId =
      recordViewFunctionId ?? this.generateId("record-function-", null);
    this.recordViewId = recordViewId;
    this.workflowId = workflowId;
    this.sortOrder = sortOrder;
    this.isDraggedOver = isDraggedOver;
    this.functionCaption = functionCaption;
  }
}
export default RecordViewFunction;
