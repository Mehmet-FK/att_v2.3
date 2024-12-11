import { viewTypeConstants, workflowStepTypeIds } from "@/helpers/Constants";
import {
  addListView,
  addViewHeader,
  addViewHeaderColumn,
  addViewHeaderRow,
  addWorkflowStep,
  changeListViewValue,
  changeNextAndPreviousStep,
  changeStepValue,
  changeViewHeaderColumnValue,
  changeWorkflowValue,
  removeViewHeaderColumn,
  removeViewHeaderRow,
  removeWorkflowStep,
  updateSelectedStep as updateStep,
  updateTotalWorkflow,
} from "@/redux/slices/workflowSlice";
import { useDispatch, useSelector } from "react-redux";

const initialWorkflowState = {
  selectedStepID: "",

  workflowName: "",
  workflowCaption: "",
  workflowIcon: "",
  permissionType: "",
  parentWorkflowId: "",
  entityId: "",

  launchElementName: "",
  launchElementDescription: "",
  launchElementType: "",

  childAdapter: "",
  parentAdapter: "",
  workflowSteps: [],
};

const useWorkflowForms = () => {
  const dispatch = useDispatch();
  const { selectedStepId, workflowId } = useSelector((state) => state.workflow);

  const generateRandomId = () => {
    return `${Math.floor(Math.random() * 1000) + Date.now()}`;
  };

  const handleWorkflowBlur = (e) => {
    const { value, name, type, checked } = e.target;
    dispatch(
      changeWorkflowValue({
        value: type === "checkbox" ? checked : value,
        name,
      })
    );
  };

  const createWorkflowStep = (stepID) => {
    const step = {
      workflowStepId: stepID,
      workflowID: workflowId,
      name: "",
      nextStep: "",
      previousStep: "",
    };
    dispatch(addWorkflowStep({ step }));
  };

  const createListViewOnDrop = (workflowStepId, listViewId, headerId) => {
    const template = {
      listViewId: listViewId,
      workflowStepId: workflowStepId,
      entityId: "",
      hasLookup: true,
      onlyOnline: false,
      elementBackgroundColor: "",
      elementIconPath: "",
      headerId: headerId || "",
      listViewElementId: "",
    };
    dispatch(addListView({ listView: template }));
  };
  const createViewHeaderWithRowsAndColumnsOnDrop = (viewId, viewType) => {
    const headerId = `${viewId}-vh`;
    createViewHeader(viewId, viewType, headerId);
    createViewHeaderRow(headerId);
  };

  const createViewHeader = (viewId, viewType, headerId) => {
    const template = {
      headerId: headerId,
      viewType: viewType,
      viewId: viewId,
      caption: "",
      defaultIcon: "",
      gradientStart: "",
      gradientEnd: "",
    };

    dispatch(addViewHeader({ viewHeader: template }));
  };

  const createViewHeaderRow = (headerId) => {
    const rowId = "vhr-" + generateRandomId();
    const template = {
      headerRowId: rowId,
      headerId: headerId,
      rowAlignment: 0,
    };

    dispatch(addViewHeaderRow({ viewHeaderRow: template }));
    createViewHeaderColumn(rowId);
  };

  const deleteViewHeaderRow = (rowId) => {
    dispatch(removeViewHeaderRow({ rowId }));
  };

  const createViewHeaderColumn = (headerRowId) => {
    const tempID = "vhc" + generateRandomId();
    const template = {
      headerColumnId: tempID,
      headerRowId: headerRowId,
      columnType: 3,
      columnValue: tempID,
      colSpan: 2,
      rowSpan: 1,
      fontColor: "#FFFFFF",
      textAlignment: 0,
      fontFamily: 3,
    };

    dispatch(addViewHeaderColumn({ viewHeaderColumn: template }));
  };

  const updateViewHeaderColumnValue = (name, value, columnId) => {
    dispatch(changeViewHeaderColumnValue({ name, value, columnId }));
  };

  const deleteViewHeaderColumn = (columnId) => {
    dispatch(removeViewHeaderColumn({ columnId }));
  };

  const createViewOnDrop = (viewName, workflowStepId) => {
    if (viewName === viewTypeConstants.LISTVIEW) {
      const listViewId = workflowStepId + "-listView";
      createListViewOnDrop(workflowStepId, listViewId);
      createViewHeaderWithRowsAndColumnsOnDrop(
        listViewId,
        workflowStepTypeIds.LISTVIEW
      );
    }
  };

  const deleteWorkflowStep = (stepID) => {
    dispatch(removeWorkflowStep({ id: stepID }));
  };

  const handleWFStepBlur = (name, value) => {
    // console.log(value);
    dispatch(changeStepValue({ name, value }));
  };

  const updateListView = (name, value, viewId) => {
    console.log(viewId);
    dispatch(changeListViewValue({ name, value, viewId }));
  };

  const updateSelectedStep = (stepId) => {
    if (selectedStepId === stepId) return;
    dispatch(updateStep({ stepId }));
  };

  const setPreviousAndNextStepsOnConnect = (params) => {
    const previousStepId = params.source;
    const nextStepId = params.target;
    console.log(params);
    dispatch(
      changeNextAndPreviousStep({
        nextStepId: nextStepId,
        previousStepId: previousStepId,
      })
    );
  };

  const restoreWorkflowState = (workflow) => {
    if (workflow) {
      dispatch(updateTotalWorkflow({ workflow }));
    } else {
      dispatch(
        updateTotalWorkflow({
          workflow: {
            ...initialWorkflowState,
          },
        })
      );
    }
  };

  return {
    generateRandomId,
    handleWFStepBlur,
    handleWorkflowBlur,
    createWorkflowStep,
    createViewOnDrop,
    createViewHeaderWithRowsAndColumnsOnDrop,
    createViewHeaderRow,
    createViewHeaderColumn,
    deleteWorkflowStep,
    deleteViewHeaderRow,
    deleteViewHeaderColumn,
    updateSelectedStep,
    updateListView,
    updateViewHeaderColumnValue,
    restoreWorkflowState,
    setPreviousAndNextStepsOnConnect,
  };
};

export default useWorkflowForms;
