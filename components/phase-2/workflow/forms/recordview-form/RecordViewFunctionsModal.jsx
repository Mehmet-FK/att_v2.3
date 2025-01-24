import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableRecordViewFunction = ({
  index,
  functionValues,
  workflowsForAutoCompleteSelect,
  changeRecordFunctionValue,
  deleteRecordFunction,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const [functionFormValues, setFunctionFormValues] = useState(functionValues);
  const isDraggedOver = functionFormValues.isDraggedOver;
  const functionID = functionFormValues.recordViewFunctionId;

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFunctionFormValues((prev) => ({ ...prev, [name]: newValue }));
  };
  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    changeRecordFunctionValue(name, newValue, functionID);
  };

  const handleDeleteFunction = (e) => {
    if (e.detail < 2) return;
    deleteRecordFunction(functionID);
  };

  const handleDragStart = (e) => {
    onDragStart(e, functionFormValues, index);
  };

  const handleDragEnter = (e) => {
    onDragEnter(functionFormValues, index);
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: true }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };
  const handleDragEnd = (e) => {
    onDragEnd(functionFormValues, index);
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };

  useEffect(() => {
    setFunctionFormValues(functionValues);
  }, [functionValues.recordViewFunctionId]);

  return (
    <div
      droppable
      draggable
      style={{
        marginRight: "-15px",
        paddingRight: "10px",

        paddingBlock: isDraggedOver ? "15px" : "5px",
        boxShadow:
          isDraggedOver &&
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        transition: "all 0.2s ease-in-out ",
      }}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={<DeleteIcon color="secondary" fontSize="small" />}
        slotProps={{
          badge: {
            sx: {
              marginLeft: "10px",
              width: "1.7rem",
              height: "1.7rem",
              backgroundColor: "#ccc",
              cursor: "pointer",
              display: "flex",
              opacity: "0",
              transition: "all 0.2s ease-in-out",
            },
            onClick: handleDeleteFunction,
          },
        }}
        sx={{
          width: "100%",

          backgroundColor: "inherit",
          pointerEvents: isDraggedOver ? "none" : "auto",
          "&:hover .MuiBadge-badge": {
            opacity: "1",
          },
        }}
      >
        <Card sx={{ width: "100%", backgroundColor: "inherit" }}>
          <CardContent>
            <div className={css.flex_row}>
              <TextField
                value={functionFormValues?.recordViewFunctionId || ""}
                variant="outlined"
                size="small"
                label="ID"
                name="recordViewFunctionId"
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={functionFormValues?.sortOrder || ""}
                variant="outlined"
                size="small"
                label="sortOrder"
                name="sortOrder"
              />
              <AutoCompleteSelect
                mainProps={{
                  handleChange: handleChange,
                  handleBlur: handleBlur,
                  preferences: {
                    key: "id",
                    caption: "path",

                    image: "icon",
                    title: "path",
                  },
                  options: workflowsForAutoCompleteSelect || [],
                  name: "workflowId",
                  value: functionFormValues.workflowId || "",
                  label: "Workflow",
                }}
                helperProps={{
                  size: "small",
                  fullWidth: true,
                }}
              />
            </div>
          </CardContent>
        </Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "grab",
            pointerEvents: isDraggedOver ? "none" : "auto",
          }}
        >
          <DragIndicatorIcon />
        </div>
      </Badge>
    </div>
  );
};

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
              minHeight: "100%",
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
