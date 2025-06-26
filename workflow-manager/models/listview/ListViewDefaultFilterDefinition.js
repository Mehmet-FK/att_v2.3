import BaseModel from "../BaseModel";

class ListViewDefaultFilterDefinition extends BaseModel {
  constructor({
    listViewDefaultFilterId = null,
    listViewId,
    fieldId = null,
    filterValue = "",
  }) {
    super();
    this.listViewDefaultFilterId =
      listViewDefaultFilterId ?? this.generateId("lv-default-filter-", null);
    this.listViewId = listViewId;
    this.fieldId = fieldId;
    this.filterValue = filterValue;
  }
}

export default ListViewDefaultFilterDefinition;
