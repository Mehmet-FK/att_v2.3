import { useSelector } from "react-redux";
import ListViewForm from "../../forms/listview-form";
import RecordViewForm from "../../forms/recordview-form";
import ScannerDialogForm from "../../forms/scanner-dialog-form";
import TileViewForm from "../../forms/TileViewForm";
import WorkflowForm from "../../forms/workflow-form";
import { useMemo } from "react";
import { viewTypeConstants } from "@/helpers/Constants";
import ModalDialogForm from "../../forms/modal-dialog-form";

const DisplaySelectedForm = ({ selectedNode }) => {
  const entities = useSelector((state) => state.attensam.data?.entities);

  const isScannerDialog = (viewType) => {
    return (
      viewType === viewTypeConstants.SCANNER_DIALOG_NFC ||
      viewType === viewTypeConstants.SCANNER_DIALOG_QR
    );
  };

  const prepareEntitiesForAutoSelect = () => {
    if (!entities) return [];
    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      caption: entity.caption,
    }));
  };

  const entitiesForAutoSelect = useMemo(
    () => prepareEntitiesForAutoSelect(),
    [entities]
  );

  const viewType = selectedNode?.viewType;

  if (viewType === viewTypeConstants.RECORDVIEW) {
    return (
      <RecordViewForm
        stepID={selectedNode.id}
        entitiesForAutoSelect={entitiesForAutoSelect}
      />
    );
  } else if (viewType === viewTypeConstants.LISTVIEW) {
    return (
      <ListViewForm
        stepID={selectedNode.id}
        entitiesForAutoSelect={entitiesForAutoSelect}
      />
    );
  } else if (viewType === viewTypeConstants.TILEVIEW) {
    return (
      <TileViewForm
        stepID={selectedNode.id}
        entitiesForAutoSelect={entitiesForAutoSelect}
      />
    );
  } else if (isScannerDialog(viewType)) {
    return (
      <ScannerDialogForm
        stepID={selectedNode.id}
        entitiesForAutoSelect={entitiesForAutoSelect}
      />
    );
  } else if (viewType === viewTypeConstants.MODALDIALOG) {
    return <ModalDialogForm stepID={selectedNode.id} />;
  } else {
    return <WorkflowForm entitiesForAutoSelect={entitiesForAutoSelect} />;
  }
};

export default DisplaySelectedForm;
