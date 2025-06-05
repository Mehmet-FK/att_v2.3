import BaseModel from "./BaseModel";

class ListView extends BaseModel {
  constructor({
    listViewId = null,
    workflowStepId,
    listViewElementId = null,
    headerId = null,
    entityId = "",
    hasLookup = true,
    onlyOnline = false,
    mergeData = false,
    elementBackgroundColor = "",
    elementIconPath = "",
  }) {
    super();
    this.listViewId = listViewId ?? this.generateId(null, "-listview");
    this.workflowStepId = workflowStepId;
    this.entityId = entityId;
    this.hasLookup = hasLookup;
    this.onlyOnline = onlyOnline;
    this.mergeData = mergeData;
    this.elementBackgroundColor = elementBackgroundColor;
    this.elementIconPath = elementIconPath;
    this.headerId = headerId ?? `${this.listViewId}-vh`;
    this.listViewElementId = listViewElementId ?? `${this.listViewId}"-lve`;
  }
}

export default ListView;
