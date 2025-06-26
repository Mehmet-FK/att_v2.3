import BaseModel from "../BaseModel";

class RecordViewField extends BaseModel {
  constructor({
    recordViewFieldId = null,
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
    isDraggedOver = false,
  }) {
    super();
    this.recordViewFieldId =
      recordViewFieldId ?? this.generateId(null, "-record-field");
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
    this.isDraggedOver = isDraggedOver;
  }
}

export default RecordViewField;
