import BaseModel from "./BaseModel";

class RecordView extends BaseModel {
  constructor({
    recordViewId = null,
    workflowStepId,
    headerId = null,
    entityId = null,
    isEditable = false,
    showMenue = true,
    createNewDataset = false,
    cacheOnSubmit = false,
  }) {
    super();
    this.recordViewId = recordViewId ?? this.generateId(null, "-recordview");
    this.workflowStepId = workflowStepId;
    this.entityId = entityId;
    this.headerId = headerId ?? `${this.recordViewId}-vh`;
    this.isEditable = isEditable;
    this.showMenue = showMenue;
    this.createNewDataset = createNewDataset;
    this.cacheOnSubmit = cacheOnSubmit;
  }
}

export default RecordView;
