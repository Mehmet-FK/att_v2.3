import BaseModel from "../BaseModel";

class ListViewFilterDefinition extends BaseModel {
  constructor({
    filterDefinitionId = null,
    listViewId,
    fieldId = null,
    filterValue = "",
  }) {
    super();
    this.filterDefinitionId =
      filterDefinitionId ?? this.generateId("filter-def-", null);
    this.listViewId = listViewId;
    this.fieldId = fieldId;
    this.filterValue = filterValue;
  }
}

export default ListViewFilterDefinition;
