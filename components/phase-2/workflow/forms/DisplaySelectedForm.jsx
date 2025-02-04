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
  const { workflowSteps } = useSelector((state) => state.workflow);

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
        stepID={stepID}
        workflowStepValues={selectedWorkflowStep}
      />
    );
  } else if (viewType === viewTypeConstants.LISTVIEW) {
    return (
      <ListViewForm stepID={stepID} workflowStepValues={selectedWorkflowStep} />
    );
  } else if (viewType === viewTypeConstants.TILEVIEW) {
    return (
      <TileViewForm stepID={stepID} workflowStepValues={selectedWorkflowStep} />
    );
  } else if (isScannerDialog(viewType)) {
    return (
      <ScannerDialogForm
        stepID={stepID}
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
    return <WorkflowForm />;
  }
};

export default DisplaySelectedForm;
