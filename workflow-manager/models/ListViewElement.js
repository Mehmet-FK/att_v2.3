import BaseModel from "./BaseModel";

class ListViewElement extends BaseModel {
  constructor({ listViewElementId, icon = "" }) {
    super();
    this.listViewElementId = listViewElementId;
    this.icon = icon;
  }
}

export default ListViewElement;
