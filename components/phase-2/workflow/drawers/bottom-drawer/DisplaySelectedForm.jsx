import { useSelector } from "react-redux";
import ListViewForm from "../../forms/listview-form";
import RecordViewForm from "../../forms/recordview-form";
import ScannerDialogForm from "../../forms/scanner-dialog-form";
import TileViewForm from "../../forms/TileViewForm";
import WorkflowForm from "../../forms/workflow-form";
import { useEffect, useMemo } from "react";
import { viewTypeConstants } from "@/helpers/Constants";
import ModalDialogForm from "../../forms/modal-dialog-form";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";

const DisplaySelectedForm = ({ selectedNode }) => {
  const entities = useSelector((state) => state.attensam.data?.entities);
  const { workflowSteps } = useSelector((state) => state.workflow);

  const [runWorker, entitiesForAutoSelect, error, loading] =
    useAutoCompleteDataWorker("/workers/prepareEntitiesWorker.js");

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

  // const prepareEntitiesForAutoSelect = () => {
  //   if (!entities) return [];
  //   return entities.map((entity) => ({
  //     id: entity.id,
  //     name: entity.name,
  //     caption: entity.caption,
  //   }));
  // };

  // const entitiesForAutoSelect = useMemo(
  //   () => prepareEntitiesForAutoSelect(),
  //   [entities]
  // );

  const selectedWorkflowStep = useMemo(
    () => findWorkflowStepById(stepID),
    [selectedNode]
  );

  useEffect(() => {
    if (entities) {
      runWorker(entities);
    }
  }, [entities]);

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
    return <WorkflowForm entitiesForAutoSelect={entitiesForAutoSelect || []} />;
  }
};

export default DisplaySelectedForm;
