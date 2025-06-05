import { useSelector } from "react-redux";
import { useMemo } from "react";
import { viewTypeConstants } from "@/helpers/Constants";
import RecordViewForm from "./recordview";
import TileViewForm from "./tile-view";
import WorkflowForm from "./workflow";
import InfoScreenForm from "./info-screen";
import ScannerDialogForm from "./scanner-dialog";
import WorkflowRelayForm from "./workflow-relay";
import ListViewForm from "./listview";
import ModalDialogForm from "./modal-dialog";

const DisplaySelectedForm = ({ selectedNode }) => {
  const workflowSteps = useSelector((state) => state.workflow.workflowSteps);
  const workflowId = useSelector((state) => state.workflow.workflowId);

  const viewType = selectedNode?.viewType;
  const stepID = selectedNode?.id;

  const isScannerDialog = (viewType) => {
    return (
      viewType === viewTypeConstants.SCANNER_DIALOG_NFC ||
      viewType === viewTypeConstants.SCANNER_DIALOG_QR
    );
  };
  const findWorkflowStepById = (_stepID) => {
    const step = workflowSteps.find((wfs) => wfs.workflowStepId === _stepID);
    return step;
  };

  const selectedWorkflowStep = useMemo(
    () => findWorkflowStepById(stepID),
    [selectedNode, workflowSteps]
  );

  if (viewType === viewTypeConstants.RECORDVIEW) {
    return (
      <RecordViewForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.LISTVIEW) {
    return (
      <ListViewForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.TILEVIEW) {
    return (
      <TileViewForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (isScannerDialog(viewType)) {
    return (
      <ScannerDialogForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.MODALDIALOG) {
    return (
      <ModalDialogForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.WORKFLOW_RELAY) {
    return (
      <WorkflowRelayForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.INFO_SCREEN) {
    return (
      <InfoScreenForm
        key={stepID}
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else {
    return <WorkflowForm key={workflowId} />;
  }
};

export default DisplaySelectedForm;
