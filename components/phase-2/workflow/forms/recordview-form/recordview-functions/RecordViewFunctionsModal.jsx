import { Button, Card, CardContent, Modal } from "@mui/material";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import DraggableRecordViewFunction from "./DraggableRecordViewFunction";

const recordFunctionTemplate = {
  recordViewFunctionId: "",
  recordViewId: "",
  workflowId: "",
  sortOrder: null,
  isDraggedOver: false,
};

const RecordViewFunctionsModal = ({ open, setOpen, recordViewId }) => {
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

  const assignFunctionIndexToSortOrder = () => {
    const preparedRecordFunction = filteredRecordFunctions?.map(
      (recordFunction, index) => ({
        ...recordFunction,
        sortOrder: index + 1,
        isDraggedOver: false,
      })
    );
    setRecordFunctions(preparedRecordFunction);
  };

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

  const draggingElementRef = useRef(null);
  const draggedOverElementRef = useRef(null);

  const handleDragStart = (e, element, index) => {
    draggingElementRef.current = { element, index };

    const dragElement = e.target;
    const clone = dragElement.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    clone.style.left = "-1000px";
    clone.style.background = "#f00";
    clone.style.marginTop = "500px";
    clone.style.width = `${dragElement.offsetWidth}px`;
    clone.style.height = `60px`;
    clone.style.cursor = "grab";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    const offsetX = dragElement.offsetWidth - 10;
    const offsetY = dragElement.offsetHeight - 20;

    e.dataTransfer.setDragImage(clone, offsetX, offsetY);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const handleDragEnter = (element, index) => {
    draggedOverElementRef.current = { element, index };
  };

  const handleDragEnd = (e, elements, setElements) => {
    let tempElements = [...recordFunctions];

    if (!draggedOverElementRef.current || !draggingElementRef.current) return;

    const draggingElement = draggingElementRef.current.element;
    const draggingElementIndex = draggingElementRef.current.index;
    const draggedOverElementIndex = draggedOverElementRef.current.index;

    tempElements.splice(draggingElementIndex, 1);
    tempElements.splice(draggedOverElementIndex, 0, draggingElement);

    tempElements = tempElements.map((element, index) => ({
      ...element,
      sortOrder: index + 1,
    }));

    console.log(tempElements);

    draggingElementRef.current = null;
    draggedOverElementRef.current = null;

    setRecordFunctions(tempElements);
  };

  const updateStoreOnClose = () => {
    updateAllRecordViewFunctions(recordViewId, recordFunctions);
    setOpen(false);
  };

  useEffect(() => {
    if (filteredRecordFunctions?.length < 1) return;
    assignFunctionIndexToSortOrder();
  }, [filteredRecordFunctions]);

  useEffect(() => {
    if (workflows) {
      runWorkflowWorker(workflows);
    }
  }, [workflows]);

  return (
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
                  index={index}
                  functionValues={recordFunction}
                  workflowsForAutoCompleteSelect={
                    workflowsForAutoCompleteSelect
                  }
                  changeRecordFunctionValue={changeRecordFunctionValue}
                  deleteRecordFunction={deleteRecordFunction}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleDragEnd}
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
  );
};

export default RecordViewFunctionsModal;

{
  /* <Accordion sx={{ width: "100%" }}>
<AccordionSummary
  sx={{ fontSize: "smaller", paddingBlock: "0" }}
  expandIcon={<ExpandMoreIcon fontSize="small" />}
  aria-controls="record-functions-content"
  id="record-functions-header"
>
  Record Funktionen
</AccordionSummary>
<AccordionDetails>
  <div className={css.flex_row}>
    {Object.values(recordFunctions)?.map((rvf) => (
      <RecordViewFunctionCard
        functionValues={rvf}
        handleChange={handleChange}
        workflowsForAutoCompleteSelect={workflowsForAutoCompleteSelect}
      />
    ))}
  </div>
</AccordionDetails>
</Accordion> */
}
