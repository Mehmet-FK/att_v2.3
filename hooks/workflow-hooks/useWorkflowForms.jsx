import { viewTypeConstants, workflowStepTypeIds } from "@/helpers/Constants";
import {
  addListView,
  addListViewElement,
  addListViewElementRow,
  addViewHeader,
  addViewHeaderColumn,
  addViewHeaderRow,
  addWorkflowStep,
  changeListViewElementRowValue,
  changeListViewElementValue,
  changeListViewValue,
  changeNextAndPreviousStep,
  changeStepValue,
  changeViewHeaderColumnValue,
  changeWorkflowValue,
  removeListView,
  removeListViewElement,
  removeListViewElementRowByElementId,
  removeListViewElementRowByRowId,
  removeViewHeader,
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
  const {
    selectedStepId,
    workflowId,
    listViews,
    headers,
    headerRows,
    headerColumns,
  } = useSelector((state) => state.workflow);

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

  const createListViewElementRow = (listViewElementId) => {
    const template = {
      listViewElementRowId: "lvr-" + generateRandomId(),
      listViewElementId: listViewElementId,
      listViewRowNumber: 1,
      text: "",
      fontFamily: 3,
      fontColor: "#1D1D1D",
    };

    dispatch(addListViewElementRow({ elementRow: template }));
  };

  const updateListViewElementRowValue = (name, value, elementRowId) => {
    dispatch(
      changeListViewElementRowValue({ name, value, rowId: elementRowId })
    );
  };

  const deleteListViewElementRowByElementId = (listViewElementId) => {
    dispatch(
      removeListViewElementRowByElementId({ elementId: listViewElementId })
    );
  };
  const deleteListViewElementRowByRowId = (listViewElementRowId) => {
    dispatch(removeListViewElementRowByRowId({ rowId: listViewElementRowId }));
  };

  const createListViewElement = (listViewElementId) => {
    const template = {
      listViewElementId: listViewElementId,
      icon: "",
    };

    dispatch(addListViewElement({ listViewElement: template }));
    createListViewElementRow(listViewElementId);
  };

  const updateListViewElementValue = (name, value, listViewElementId) => {
    dispatch(
      changeListViewElementValue({ name, value, elementId: listViewElementId })
    );
  };

  const deleteListViewElement = (listViewElementId) => {
    dispatch(removeListViewElement({ elementId: listViewElementId }));
    deleteListViewElementRowByElementId(listViewElementId);
  };

  const createListViewOnDrop = (workflowStepId, listViewId, headerId) => {
    const listViewElementId = listViewId + "-lve";

    const template = {
      listViewId: listViewId,
      workflowStepId: workflowStepId,
      entityId: "",
      hasLookup: true,
      onlyOnline: false,
      elementBackgroundColor: "",
      elementIconPath: "",
      headerId: headerId || "",
      listViewElementId: listViewElementId,
    };

    createListViewElement(listViewElementId);
    dispatch(addListView({ listView: template }));
  };

  const deleteListView = (listViewId, listViewElementId) => {
    dispatch(removeListView({ viewId: listViewId }));
    deleteListViewElement(listViewElementId);
  };

  const createViewHeaderWithRowsAndColumnsOnDrop = (
    viewId,
    viewType,
    headerId
  ) => {
    // const headerId = `${viewId}-vh`;
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

  const deleteViewHeader = (viewHeaderId) => {
    const headerRowIds = headerRows
      .filter((vhr) => vhr.headerId === viewHeaderId)
      .flatMap((vhr) => vhr.headerRowId);
    const headerColumnIds = headerColumns
      .filter((vhc) => headerRowIds.includes(vhc.headerRowID))
      .flatMap((vhc) => vhc.headerColumnId);

    headerRowIds.forEach((vhrId) => deleteViewHeaderRow(vhrId));
    headerColumnIds.forEach((vhcId) => deleteViewHeaderColumn(vhcId));

    dispatch(
      removeViewHeader({
        viewHeaderId: viewHeaderId,
      })
    );
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
      headerRowID: headerRowId,
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

  const createViewOnDrop = (viewType, workflowStepId) => {
    if (viewType === viewTypeConstants.LISTVIEW) {
      const listViewId = workflowStepId + "-listview";
      const headerId = `${listViewId}-vh`;
      createListViewOnDrop(workflowStepId, listViewId, headerId);
      createViewHeaderWithRowsAndColumnsOnDrop(
        listViewId,
        workflowStepTypeIds.LISTVIEW,
        headerId
      );
    }
  };

  const deleteView = (viewType, workflowStepId) => {
    if (viewType === viewTypeConstants.LISTVIEW) {
      const listViewToDelete = listViews.find(
        (lv) => lv.workflowStepId === workflowStepId
      );
      const listViewId = listViewToDelete.listViewId;
      const listViewElementId = listViewToDelete.listViewElementId;

      deleteListView(listViewId, listViewElementId);

      const headerId = headers.find((vh) => vh.viewId === listViewId).headerId;
      deleteViewHeader(headerId);
    }
  };

  const deleteWorkflowStep = (step) => {
    const workflowStepId = step.id;
    const viewType = step.type;
    console.log(step);
    deleteView(viewType, workflowStepId);
    dispatch(removeWorkflowStep({ id: workflowStepId }));
  };

  const handleWFStepBlur = (name, value) => {
    dispatch(changeStepValue({ name, value }));
  };

  const updateListView = (name, value, viewId) => {
    dispatch(changeListViewValue({ name, value, viewId }));
  };

  const updateSelectedStep = (stepId) => {
    if (selectedStepId === stepId) return;
    dispatch(updateStep({ stepId }));
  };

  const setPreviousAndNextStepsOnConnect = (params) => {
    const previousStepId = params.source;
    const nextStepId = params.target;
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
    createListViewElementRow,
    createViewHeaderWithRowsAndColumnsOnDrop,
    createViewHeaderRow,
    createViewHeaderColumn,
    deleteWorkflowStep,
    deleteView,
    deleteListViewElementRowByElementId,
    deleteListViewElementRowByRowId,
    deleteViewHeaderRow,
    deleteViewHeaderColumn,
    updateSelectedStep,
    updateListView,
    updateListViewElementValue,
    updateListViewElementRowValue,
    updateViewHeaderColumnValue,
    restoreWorkflowState,
    setPreviousAndNextStepsOnConnect,
  };
};

export default useWorkflowForms;
