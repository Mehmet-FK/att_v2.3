import BaseModel from "./BaseModel";

class ViewHeaderColumn extends BaseModel {
  constructor({
    headerColumnId = null,
    headerRowID,
    columnType = 3,
    columnValue = "",
    colSpan = 2,
    rowSpan = 1,
    fontColor = "#ffffff",
    textAlignment = 0,
    fontFamily = 3,
  }) {
    super();
    this.headerColumnId = headerColumnId ?? this.generateId("vhc-", null);
    this.headerRowID = headerRowID;
    this.columnType = columnType;
    this.columnValue = columnValue;
    this.colSpan = colSpan;
    this.rowSpan = rowSpan;
    this.fontColor = fontColor;
    this.textAlignment = textAlignment;
    this.fontFamily = fontFamily;
  }
}
export default ViewHeaderColumn;
