import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import {
  scannerTypeConstants,
  viewTypeConstants,
  workflowStepTypeIds,
} from "@/helpers/Constants";
import ScannerDialogFormBase from "./ScannerDialogFormBase";
import ViewHeaderForm from "../header-form";

import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";

const ScannerDialogForm = ({ stepID, workflowStepValues }) => {
  const { prepareEntityFields } = useWorkflowForms();
  const { scannerDialogs, recordViewFields, recordViews } = useSelector(
    (state) => state.workflow
  );
  const entities = useSelector((state) => state.attensam.data?.entities);

  const scannerDialog = useMemo(
    () => scannerDialogs.find((sc) => sc.workflowStepId === stepID),
    [scannerDialogs, stepID]
  );

  const [scannerDialogValues, setScannerDialogValues] = useState(scannerDialog);

  const findNextRecordViewId = () => {
    const nextStep = workflowStepValues?.nextStep;
    if (!nextStep) return null;
    const recordView = recordViews.find((rv) => rv.workflowStepId === nextStep);

    return recordView ? recordView.recordViewId : null;
  };

  const recordViewId = useMemo(
    () => findNextRecordViewId(),
    [workflowStepValues]
  );

  const entityFields = useMemo(
    () => prepareEntityFields(entities, scannerDialogValues?.entityId),
    [entities, scannerDialogValues?.entityId]
  );

  const targetFieldOptions = useMemo(() => {
    if (!recordViewId) return [];
    return (
      recordViewFields?.filter((rvf) => rvf.recordViewId === recordViewId) || []
    );
  }, [recordViewId, recordViewFields]);

  const viewId = scannerDialog?.scannerDialogId;
  const isNfcScanner = scannerDialog?.scannerType === scannerTypeConstants.NFC;

  if (isNfcScanner) {
    return (
      <ScannerDialogFormBase
        viewId={viewId}
        scannerDialogValues={scannerDialogValues}
        setScannerDialogValues={setScannerDialogValues}
        entityFields={entityFields}
        targetFieldOptions={targetFieldOptions}
      >
        <div className={css.header_form_wrapper}>
          <ViewHeaderForm
            viewId={viewId}
            viewType={workflowStepTypeIds.SCANNER_DIALOG}
            entityFields={entityFields}
            defaultExpanded={true}
          />
        </div>
      </ScannerDialogFormBase>
    );
  } else {
    return (
      <ScannerDialogFormBase
        viewId={viewId}
        scannerDialogValues={scannerDialogValues}
        setScannerDialogValues={setScannerDialogValues}
        entityFields={entityFields}
        targetFieldOptions={targetFieldOptions}
      />
    );
  }
};

export default ScannerDialogForm;
