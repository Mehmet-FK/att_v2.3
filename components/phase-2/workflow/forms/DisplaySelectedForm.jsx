import { useSelector } from "react-redux";
// import ListViewForm from "../../forms/listview-form";
// import RecordViewForm from "../../forms/recordview-form";
// import ScannerDialogForm from "../../forms/scanner-dialog-form";
// import WorkflowForm from "../../forms/workflow-form";
import { useEffect, useMemo } from "react";
import { viewTypeConstants } from "@/helpers/Constants";
// import ModalDialogForm from "../../forms/modal-dialog-form";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import RecordViewForm from "./recordview-form";
import ListViewForm from "./listview-form";
import TileViewForm from "./tile-view-form";
import ScannerDialogForm from "./scanner-dialog-form";
import ModalDialogForm from "./modal-dialog-form";
import WorkflowForm from "./workflow-form";
// import TileViewForm from "../../forms/tile-view-form";

const DisplaySelectedForm = ({ selectedNode }) => {
  const entities = useSelector((state) => state.attensam.data?.entities);
  const workflows = useSelector((state) => state.attensam.data?.workflows);
  const { workflowSteps } = useSelector((state) => state.workflow);

  const [runEntityWorker, entitiesForAutoSelect] = useAutoCompleteDataWorker(
    "/workers/prepareEntitiesWorker.js"
  );

  const [runWorkflowWorker, workflowsForAutoCompleteSelect] =
    useAutoCompleteDataWorker("/workers/prepareWorkflowsWorker.js");

  const viewType = selectedNode?.viewType;
  const stepID = selectedNode?.id;

  const isScannerDialog = (viewType) => {
    return (
      viewType === viewTypeConstants.SCANNER_DIALOG_NFC ||
      viewType === viewTypeConstants.SCANNER_DIALOG_QR
    );
  };

  const findWorkflowStepById = (_stepID) =>
    workflowSteps.find((wfs) => wfs.workflowStepId === _stepID);

  const selectedWorkflowStep = useMemo(
    () => findWorkflowStepById(stepID),
    [selectedNode]
  );

  useEffect(() => {
    if (entities) {
      runEntityWorker(entities);
    }
  }, [entities]);
  useEffect(() => {
    if (workflows) {
      runWorkflowWorker(workflows);
    }
  }, [workflows]);

  if (viewType === viewTypeConstants.RECORDVIEW) {
    return (
      <RecordViewForm
        stepID={stepID}
        entitiesForAutoSelect={entitiesForAutoSelect || []}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.LISTVIEW) {
    return (
      <ListViewForm
        stepID={stepID}
        entitiesForAutoSelect={entitiesForAutoSelect || []}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.TILEVIEW) {
    return (
      <TileViewForm
        stepID={stepID}
        entitiesForAutoSelect={entitiesForAutoSelect || []}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (isScannerDialog(viewType)) {
    return (
      <ScannerDialogForm
        stepID={stepID}
        entitiesForAutoSelect={entitiesForAutoSelect || []}
        workflowsForAutoCompleteSelect={workflowsForAutoCompleteSelect || []}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.MODALDIALOG) {
    return (
      <ModalDialogForm
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else {
    return (
      <WorkflowForm
        entitiesForAutoSelect={entitiesForAutoSelect || []}
        workflowsForAutoCompleteSelect={workflowsForAutoCompleteSelect || []}
      />
    );
  }
};

export default DisplaySelectedForm;
