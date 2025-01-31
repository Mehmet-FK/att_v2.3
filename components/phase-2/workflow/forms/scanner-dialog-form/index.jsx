import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { scannerTypeConstants } from "@/helpers/Constants";
import ScannerDialogFormBase from "./ScannerDialogFormBase";
import ViewHeaderForm from "../header-form";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { selectTargetRecordViewIdOfScanner } from "@/redux/selectors/workflowSelectors";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";

const ScannerDialogForm = ({ stepID, workflowStepValues }) => {
  const { getRecordViewFields } = useAttensamCalls();
  const { prepareEntityFields } = useWorkflowForms();
  const { scannerDialogs } = useSelector((state) => state.workflow);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const scannerDialog = useMemo(
    () => scannerDialogs.find((sc) => sc.workflowStepId === stepID),
    [scannerDialogs, stepID]
  );

  const [scannerDialogValues, setScannerDialogValues] = useState(scannerDialog);
  const [targetFieldOptions, setTargetFieldOptions] = useState([]);

  const selectMemoizedRecordViewId = useMemo(
    () => selectTargetRecordViewIdOfScanner(stepID),
    [stepID]
  );
  const recordViewId = useSelector(selectMemoizedRecordViewId);

  const entityFields = useMemo(
    () => prepareEntityFields(entities, scannerDialogValues?.entityId),
    [entities, scannerDialogValues?.entityId]
  );

  const viewId = scannerDialog?.scannerDialogId;
  const isNfcScanner = scannerDialog?.scannerType === scannerTypeConstants.NFC;

  useEffect(() => {
    if (!recordViewId || isNaN(recordViewId)) {
      setTargetFieldOptions([]);
      return;
    }
    getRecordViewFields(recordViewId).then((res) => setTargetFieldOptions(res));
  }, [recordViewId]);

  useEffect(() => {
    const scannerDialogFormValueTemp = {
      ...scannerDialogValues,
      name: workflowStepValues?.name,
    };
    setScannerDialogValues(scannerDialogFormValueTemp);
  }, [viewId]);

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
            entityFields={entityFields}
            defaultExpanded={true}
          />
        </div>
      </ScannerDialogFormBase>
    );
  } else {
    return (
      <ScannerDialogFormBase
        scannerDialogValues={scannerDialogValues}
        setScannerDialogValues={setScannerDialogValues}
        viewId={viewId}
        entityFields={entityFields}
        targetFieldOptions={targetFieldOptions}
      />
    );
  }
};

export default ScannerDialogForm;
