import {
  scannerTypeConstants,
  viewTypeConstants,
  workflowStepTypeIds,
} from "@/helpers/Constants";
import {
  addLaunchElement,
  addListView,
  addListViewElement,
  addListViewElementRow,
  addRecordView,
  addScannerDialog,
  addViewHeader,
  addViewHeaderColumn,
  addViewHeaderRow,
  addWorkflowStep,
  changeLaunchElementValue,
  changeListViewElementRowValue,
  changeListViewElementValue,
  changeListViewValue,
  changeNextAndPreviousStep,
  changeNodesEdgesAndViewport,
  changeRecordViewValue,
  changeStepValue,
  changeViewHeaderColumnValue,
  changeViewHeaderValue,
  changeWorkflowValue,
  removeLaunchElement,
  removeListView,
  removeListViewElement,
  removeListViewElementRowByElementId,
  removeListViewElementRowByRowId,
  removeRecordView,
  removeScannerDialog,
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
    recordViews,
    listViews,
    headers,
    headerRows,
    headerColumns,
  } = useSelector((state) => state.workflow);

  const generateRandomId = () => {
    return `${Math.floor(Math.random() * 1000) + Date.now()}`;
  };

  const isLaunchElement = (viewType) =>
    viewType?.toLowerCase()?.includes("launch");

  const findViewByStepId = (viewsArray, workflowStepId) => {
    return viewsArray.find((v) => v.workflowStepId === workflowStepId);
  };
  const findHeaderById = (viewId) => {
    return headers.find((vh) => vh.viewId === viewId).headerId;
  };

  const updateNodesEdgesAndViewport = (nodes, edges, viewport) => {
    dispatch(changeNodesEdgesAndViewport({ nodes, edges, viewport }));
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

  const createLaunchElementOnDrop = (launchType, workflowStepId) => {
    const template = {
      launchElementId: "launch-" + workflowStepId,
      workflowStepId: workflowStepId,
      launchType: launchType || 0,
      name: "",
      description: "",
    };

    dispatch(addLaunchElement({ launchElement: template }));
  };

  const updateLaunchElementValue = (name, value, workflowStepId) => {
    dispatch(changeLaunchElementValue({ name, value, workflowStepId }));
  };

  const deleteLaunchElement = (workflowStepId) => {
    dispatch(removeLaunchElement({ workflowStepId }));
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
    deleteListViewElementRowByElementId(listViewElementId);
    dispatch(removeListViewElement({ elementId: listViewElementId }));
  };

  const createListViewOnDrop = (workflowStepId) => {
    const listViewId = workflowStepId + "-listview";
    const headerId = `${listViewId}-vh`;
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

    dispatch(addListView({ listView: template }));
    createListViewElement(listViewElementId);
    createViewHeaderWithRowsAndColumns(
      listViewId,
      workflowStepTypeIds.LISTVIEW,
      headerId
    );
  };

  const deleteListView = (workflowStepId) => {
    const listViewToDelete = findViewByStepId(listViews, workflowStepId);
    const listViewId = listViewToDelete.listViewId;
    const listViewElementId = listViewToDelete.listViewElementId;

    const headerId = findHeaderById(listViewId);
    deleteViewHeader(headerId);
    deleteListViewElement(listViewElementId);
    dispatch(removeListView({ viewId: listViewId }));
  };

  const createRecordViewOnDrop = (workflowStepId) => {
    const recordViewId = workflowStepId + "-recordview";
    const headerId = `${recordViewId}-vh`;

    const template = {
      recordViewId: recordViewId,
      workflowStepId: workflowStepId,
      entityId: "",
      headerId: headerId || "",
      isEditable: false,
      showMenue: true,
      createNewDataset: false,
    };
    dispatch(addRecordView({ recordView: template }));
    createViewHeaderWithRowsAndColumns(
      recordViewId,
      workflowStepTypeIds.RECORDVIEW,
      headerId
    );
  };

  const updateRecordViewValue = (name, value, recordViewId) => {
    dispatch(changeRecordViewValue({ name, value, viewId: recordViewId }));
  };

  const deleteRecordView = (workflowStepId) => {
    const recordViewToDelete = findViewByStepId(recordViews, workflowStepId);
    const recordViewId = recordViewToDelete.recordViewId;

    const headerId = findHeaderById(recordViewId);
    deleteViewHeader(headerId);
    dispatch(removeRecordView({ viewId: recordViewId }));
  };

  const createViewHeaderWithRowsAndColumns = (viewId, viewType, headerId) => {
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

  const updateViewHeaderValue = (name, value, headerId) => {
    dispatch(changeViewHeaderValue({ name, value, viewHeaderId: headerId }));
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

  const createScannerDialog = (dialogTemplate) => {
    dispatch(addScannerDialog({ scannerDialog: dialogTemplate }));
  };

  const createScannerDialogNFC = (workflowStepId) => {
    const scannerDialogId = workflowStepId + "-scannerdialog";
    const headerId = scannerDialogId + "-vh";
    const template = {
      scannerDialogId: scannerDialogId,
      workflowStepId: workflowStepId,
      scannerType: scannerTypeConstants.NFC,
      scannerAction: 1,
      targetFieldId: "",
      entityId: "",
      name: "",
      description: "",
      filterField: "",
      allowManualInput: true,
      inputDataSourceId: "",
      headerId: headerId,
    };

    createScannerDialog(template);
    createViewHeaderWithRowsAndColumns(
      scannerDialogId,
      workflowStepTypeIds.SCANNER_DIALOG,
      headerId
    );
  };
  const createScannerDialogQR = (workflowStepId, viewType) => {
    const scannerDialogId = workflowStepId + "-scannerdialog";
    const template = {
      scannerDialogId: scannerDialogId,
      workflowStepId: workflowStepId,
      scannerType: scannerTypeConstants.QR_CODE,
      scannerAction: 1,
      targetFieldId: "",
      entityId: "",
      name: "",
      description: "",
      filterField: "",
      allowManualInput: true,
      inputDataSourceId: "",
      headerId: "",
    };
    createScannerDialog(template);
  };

  const updateScannerDialogValue = (name, value, scannerDialogId) => {};

  const deleteScannerDialogNFC = (workflowStepId) => {
    dispatch(removeScannerDialog({ stepId: workflowStepId }));
  };

  const deleteScannerDialogQR = (workflowStepId) => {
    dispatch(removeScannerDialog({ stepId: workflowStepId }));
  };

  const createViewOnDrop = (viewType, workflowStepId, launchTypeId) => {
    if (viewType === viewTypeConstants.LISTVIEW) {
      createListViewOnDrop(workflowStepId);
    } else if (viewType === viewTypeConstants.RECORDVIEW) {
      createRecordViewOnDrop(workflowStepId);
    } else if (viewType === viewTypeConstants.SCANNER_DIALOG_NFC) {
      createScannerDialogNFC(workflowStepId, viewType);
    } else if (viewType === viewTypeConstants.SCANNER_DIALOG_QR) {
      createScannerDialogQR(workflowStepId, viewType);
    } else if (isLaunchElement(viewType)) {
      createLaunchElementOnDrop(launchTypeId, workflowStepId);
    }
  };

  const deleteView = (viewType, workflowStepId) => {
    if (viewType === viewTypeConstants.LISTVIEW) {
      deleteListView(workflowStepId);
    } else if (viewType === viewTypeConstants.RECORDVIEW) {
      deleteRecordView(workflowStepId);
    } else if (viewType === viewTypeConstants.SCANNER_DIALOG_NFC) {
      deleteScannerDialogNFC(workflowStepId);
    } else if (viewType === viewTypeConstants.SCANNER_DIALOG_QR) {
      deleteScannerDialogQR(workflowStepId);
    } else if (isLaunchElement(viewType)) {
      deleteLaunchElement(workflowStepId);
    }
  };

  const deleteWorkflowStep = (step) => {
    const workflowStepId = step.id;
    const viewType = step.type;
    deleteView(viewType, workflowStepId);
    dispatch(removeWorkflowStep({ id: workflowStepId }));
  };

  const handleWFStepBlur = (name, value) => {
    dispatch(changeStepValue({ name, value }));
  };

  const updateListViewValue = (name, value, viewId) => {
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
    createLaunchElementOnDrop,
    createViewOnDrop,
    createListViewElementRow,
    createViewHeaderWithRowsAndColumns,
    createViewHeaderRow,
    createViewHeaderColumn,
    deleteWorkflowStep,
    deleteView,
    deleteListViewElementRowByElementId,
    deleteListViewElementRowByRowId,
    deleteViewHeaderRow,
    deleteViewHeaderColumn,
    updateNodesEdgesAndViewport,
    updateSelectedStep,
    updateLaunchElementValue,
    updateScannerDialogValue,
    updateRecordViewValue,
    updateListViewValue,
    updateListViewElementValue,
    updateListViewElementRowValue,
    updateViewHeaderValue,
    updateViewHeaderColumnValue,
    restoreWorkflowState,
    setPreviousAndNextStepsOnConnect,
  };
};

export default useWorkflowForms;
