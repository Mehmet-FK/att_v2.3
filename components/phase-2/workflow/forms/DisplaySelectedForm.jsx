import { useSelector } from "react-redux";
import { useMemo } from "react";
import { viewTypeConstants } from "@/helpers/Constants";
import RecordViewForm from "./recordview-form";
import ListViewForm from "./listview-form";
import TileViewForm from "./tile-view-form";
import ScannerDialogForm from "./scanner-dialog-form";
import ModalDialogForm from "./modal-dialog-form";
import WorkflowForm from "./workflow-form";

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
  } else {
    return <WorkflowForm key={workflowId} />;
  }
};

export default DisplaySelectedForm;
