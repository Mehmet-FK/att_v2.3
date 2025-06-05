import BaseModel from "./BaseModel";

class ViewHeaderRow extends BaseModel {
  constructor({ headerRowId = null, headerId, rowAlignment = 0 }) {
    super();
    this.headerRowId = headerRowId ?? this.generateId("vhr-", null);
    this.headerId = headerId;
    this.rowAlignment = rowAlignment;
  }
}

export default ViewHeaderRow;
