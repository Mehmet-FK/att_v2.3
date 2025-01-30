import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { scannerTypeConstants } from "@/helpers/Constants";
import ScannerDialogFormBase from "./ScannerDialogFormBase";
import ViewHeaderForm from "../header-form";

const ScannerDialogForm = ({
  stepID,
  entitiesForAutoSelect,
  workflowsForAutoCompleteSelect,
  workflowStepValues,
}) => {
  const { scannerDialogs } = useSelector((state) => state.workflow);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const scannerDialog = useMemo(
    () => scannerDialogs.find((sc) => sc.workflowStepId === stepID),
    [scannerDialogs, stepID]
  );
  const [scannerDialogValues, setScannerDialogValues] = useState(scannerDialog);

  const viewId = useMemo(() => scannerDialog?.scannerDialogId, [scannerDialog]);

  const isNfcScanner = scannerDialog?.scannerType === scannerTypeConstants.NFC;

  const prepareEntityFields = () => {
    const selectedEntity = entities?.find(
      (entity) => entity.id == scannerDialogValues?.entityId
    );
    if (!selectedEntity) return [];

    return selectedEntity.fields.map((field) => ({
      id: field.id,
      caption: field.name,
    }));
  };

  const entityFields = useMemo(
    () => prepareEntityFields(),
    [scannerDialog.entityId]
  );

  if (isNfcScanner) {
    return (
      <ScannerDialogFormBase
        scannerDialog={scannerDialog}
        viewId={viewId}
        entityFields={entityFields}
        entitiesForAutoSelect={entitiesForAutoSelect}
        workflowsForAutoCompleteSelect={workflowsForAutoCompleteSelect}
        workflowStepValues={workflowStepValues}
      >
        <div className={css.header_form_wrapper}>
          <ViewHeaderForm
            viewId={viewId}
            entityFields={entityFields}
            defaultExpanded={true}
          />
        </div>
      </ScannerDialogFormBase>
    );
  } else {
    return (
      <ScannerDialogFormBase
        scannerDialog={scannerDialog}
        viewId={viewId}
        entityFields={entityFields}
        entitiesForAutoSelect={entitiesForAutoSelect}
        workflowsForAutoCompleteSelect={workflowsForAutoCompleteSelect}
        workflowStepValues={workflowStepValues}
      />
    );
  }
};

export default ScannerDialogForm;
