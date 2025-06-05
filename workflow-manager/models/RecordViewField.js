import BaseModel from "./BaseModel";

class RecordViewField extends BaseModel {
  constructor({
    recordFieldId = null,
    recordViewId,
    fieldId = null,
    caption = "",
    differingCaption = null,
    groupname = "Allgemein",
    differingGroupName = null,
    isDefault = false,
    isReadOnly = false,
    imageMode = null,
    imageGroupCaption = null,
    imageType = null,
    sortOrder = null,
  }) {
    super();
    this.recordViewFieldId =
      recordFieldId ?? this.generateId(null, "-record-field");
    this.recordViewId = recordViewId;
    this.fieldId = fieldId;
    this.caption = caption;
    this.differingCaption = differingCaption;
    this.groupname = groupname;
    this.differingGroupName = differingGroupName;
    this.isDefault = isDefault;
    this.isReadOnly = isReadOnly;
    this.imageMode = imageMode;
    this.imageGroupCaption = imageGroupCaption;
    this.imageType = imageType;
    this.sortOrder = sortOrder;
  }
}

export default RecordViewField;
