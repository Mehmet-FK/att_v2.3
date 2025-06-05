import BaseModel from "./BaseModel";

class ListViewElementRow extends BaseModel {
  constructor({
    listViewElementRowId = null,
    listViewElementId,
    listViewRowNumber = 1,
    text = "",
    fontFamily = 3,
    fontColor = "#1D1D1D",
  }) {
    super();
    this.listViewElementRowId =
      listViewElementRowId ?? this.generateId("lvr-", null);
    this.listViewElementId = listViewElementId;
    this.listViewRowNumber = listViewRowNumber;
    this.text = text;
    this.fontFamily = fontFamily;
    this.fontColor = fontColor;
  }
}

export default ListViewElementRow;
