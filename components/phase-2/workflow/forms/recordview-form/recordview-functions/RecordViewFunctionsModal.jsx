import { Button, Card, CardContent, Modal } from "@mui/material";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import DraggableRecordViewFunction from "./DraggableRecordViewFunction";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import useDragAndDropUtils from "@/hooks/workflow-hooks/workflow-form-ui-hooks/useDragAndDropUtils";

const recordFunctionTemplate = {
  recordViewFunctionId: "",
  recordViewId: "",
  workflowId: "",
  sortOrder: null,
  isDraggedOver: false,
};

const RecordViewFunctionsModal = ({ open, setOpen, recordViewId }) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const { recordViewFunctions } = useSelector((state) => state.workflow);
  const workflows = useSelector((state) => state.attensam.data?.workflows);

  const [runWorkflowWorker, workflowsForAutoCompleteSelect] =
    useAutoCompleteDataWorker("/workers/prepareWorkflowsWorker.js");

  const { generateRandomId, updateAllRecordViewFunctions } = useWorkflowForms();

  const filteredRecordFunctions = useMemo(
    () =>
      recordViewFunctions?.filter((rvf) => rvf.recordViewId === recordViewId),
    [recordViewFunctions, recordViewId]
  );

  const [recordFunctions, setRecordFunctions] = useState([
    ...filteredRecordFunctions,
  ]);

  const {
    assignSortOrderAndDragIndicator,
    onDragStart,
    onDragEnter,
    onDragEnd,
  } = useDragAndDropUtils(recordFunctions, setRecordFunctions);

  const changeRecordFunctionValue = (name, value, functionID) => {
    const changedFunctions = recordFunctions.map((el) => {
      if (el.recordViewFunctionId === functionID) {
        return { ...el, [name]: value };
      } else {
        return el;
      }
    });
    if (name === "sortOrder") {
      changedFunctions.sort((a, b) => a.sortOrder - b.sortOrder);
    }
    setRecordFunctions(changedFunctions);
  };

  const handleAddRecordFunction = () => {
    const newSortOrder = recordFunctions.at(-1)?.sortOrder + 1;
    const generatedID = generateRandomId("record-function-", null);
    const newRecordFunction = {
      ...recordFunctionTemplate,
      recordViewFunctionId: generatedID,
      recordViewId,
      sortOrder: newSortOrder,
    };
    setRecordFunctions((prev) => [...prev, newRecordFunction]);
  };

  const deleteRecordFunction = (functionID) => {
    const tempFunctions = recordFunctions.filter(
      (rvf) => rvf.recordViewFunctionId !== functionID
    );
    setRecordFunctions(tempFunctions);
  };

  const openConfirmModalToDelete = (recordFunction) => {
    const { functionCaption, recordViewFunctionId } = recordFunction;
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie die Funktion "${
        functionCaption || recordViewFunctionId
      }" löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteRecordFunction(recordViewFunctionId),
    };
    setConfirmModalValues(temp);
  };
  const updateStoreOnClose = () => {
    updateAllRecordViewFunctions(recordViewId, recordFunctions);
    setOpen(false);
  };

  useEffect(() => {
    if (filteredRecordFunctions?.length < 1) return;
    assignSortOrderAndDragIndicator(filteredRecordFunctions);
  }, [filteredRecordFunctions]);

  useEffect(() => {
    if (workflows) {
      runWorkflowWorker(workflows);
    }
  }, [workflows]);

  return (
    <>
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />
      <Modal
        open={open}
        onClose={updateStoreOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={css.card}>
          <CardContent className={css.content}>
            <div
              className={css.flex_column}
              style={{
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <div className={css.flex_column}>
                {recordFunctions?.map((recordFunction, index) => (
                  <DraggableRecordViewFunction
                    key={recordFunction?.recordViewFunctionId}
                    index={index}
                    functionValues={recordFunction}
                    workflowsForAutoCompleteSelect={
                      workflowsForAutoCompleteSelect
                    }
                    changeRecordFunctionValue={changeRecordFunctionValue}
                    openConfirmModalToDelete={openConfirmModalToDelete}
                    onDragStart={onDragStart}
                    onDragEnter={onDragEnter}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </div>

              <Button onClick={handleAddRecordFunction} variant="contained">
                Funktion anlegen
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default RecordViewFunctionsModal;
