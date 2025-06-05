import {
  scannerActionConstants,
  scannerTypeConstants,
} from "@/helpers/Constants";
import BaseModel from "./BaseModel";

class ScannerDialog extends BaseModel {
  constructor({
    scannerDialogId = null,
    workflowStepId,
    name = "",
    headerId = null,
    entityId = "",
    scannerType = scannerTypeConstants.QR_CODE,
    scannerAction = scannerActionConstants.ENTITY,
    targetFieldId = null,
    description = "",
    filterField = "",
    allowManualInput = true,
    inputDataSourceId = null,
  }) {
    super();

    this.scannerDialogId =
      scannerDialogId ?? this.generateId(null, "-info-screen");
    this.workflowStepId = workflowStepId;
    this.headerId = headerId ?? `${this.infoScreenId}-vh`;
    this.scannerType = scannerType;
    this.scannerAction = scannerAction;
    this.targetFieldId = targetFieldId;
    this.entityId = entityId;
    this.name = name;
    this.description = description;
    this.filterField = filterField;
    this.allowManualInput = allowManualInput;
    this.inputDataSourceId = inputDataSourceId;
  }
}

export default ScannerDialog;
