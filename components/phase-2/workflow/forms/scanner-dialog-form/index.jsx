import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { scannerTypeConstants } from "@/helpers/Constants";
import ScannerDialogFormBase from "./ScannerDialogFormBase";
import ViewHeaderForm from "../header-form";

const ScannerDialogForm = ({
  stepID,
  entitiesForAutoSelect,
  workflowStepValues,
}) => {
  const { scannerDialogs } = useSelector((state) => state.workflow);

  const scannerDialog = useMemo(
    () => scannerDialogs.find((sc) => sc.workflowStepId === stepID),
    [scannerDialogs, stepID]
  );
  const viewId = useMemo(() => scannerDialog?.scannerDialogId, [scannerDialog]);

  const isNfcScanner = scannerDialog?.scannerType === scannerTypeConstants.NFC;

  if (isNfcScanner) {
    return (
      <ScannerDialogFormBase
        scannerDialog={scannerDialog}
        viewId={viewId}
        entitiesForAutoSelect={entitiesForAutoSelect}
        workflowStepValues={workflowStepValues}
      >
        <div className={css.header_form_wrapper}>
          <ViewHeaderForm viewId={viewId} defaultExpanded={true} />
        </div>
      </ScannerDialogFormBase>
    );
  } else {
    return (
      <ScannerDialogFormBase
        scannerDialog={scannerDialog}
        entitiesForAutoSelect={entitiesForAutoSelect}
        workflowStepValues={workflowStepValues}
      />
    );
  }
};

export default ScannerDialogForm;
