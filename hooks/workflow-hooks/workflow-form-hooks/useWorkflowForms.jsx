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
  addModalDialog,
  addRecordView,
  addRecordViewField,
  addScannerDialog,
  addViewHeader,
  addViewHeaderColumn,
  addViewHeaderRow,
  addWorkflowStep,
  changeLaunchElementValue,
  changeListViewElementRowValue,
  changeListViewElementValue,
  changeListViewValue,
  changeModalDialogValue,
  changeNextAndPreviousStep,
  changeNodesEdgesAndViewport,
  changeAllRecordViewFields,
  changeRecordViewFieldValue,
  changeRecordViewValue,
  changeScannerDialogValue,
  changeViewHeaderColumnValue,
  changeViewHeaderValue,
  changeWorkflowStepValue,
  changeWorkflowValue,
  removeLaunchElement,
  removeListView,
  removeListViewElement,
  removeListViewElementRowByElementId,
  removeListViewElementRowByRowId,
  removeModalDialog,
  removeRecordView,
  removeRecordViewField,
  removeScannerDialog,
  removeViewHeader,
  removeViewHeaderColumn,
  removeViewHeaderRow,
  removeWorkflowStep,
  setWorkflowToInitial,
  updateSelectedStep as updateStep,
  updateTotalWorkflow,
  changeAllRecordViewFunctions,
  addListViewFilterDefinition,
  removeListViewFilterDefinition,
  changeListViewFilterDefinitionValue,
} from "@/redux/slices/workflowSlice";
import { useDispatch, useSelector } from "react-redux";

const useWorkflowForms = () => {
  const dispatch = useDispatch();
  const workflow = useSelector((state) => state.workflow);

  const {
    selectedStepId,
    workflowId,
    recordViews,
    scannerDialogs,
    listViews,
    headers,
    headerRows,
    headerColumns,
  } = workflow;

  const generateRandomId = (prefix, suffix) => {
    const _prefix = prefix ? prefix : "";
    const _suffix = suffix ? suffix : "";
    return `${_prefix}${
      Math.floor(Math.random() * 1000) + Date.now()
    }${_suffix}`;
  };

  const prepareEntityFields = (entities, entityId) => {
    const selectedEntity = entities?.find((entity) => entity.id === entityId);
    if (!selectedEntity) return [];
    return selectedEntity.fields.map((field) => ({
      id: field.id,
      fieldCaption: field.caption,
      fieldGroupName: field.groupName,
      caption: field.name,
    }));
  };

  const isLaunchElement = (viewType) =>
    viewType?.toLowerCase()?.includes("launch");

  const findViewByStepId = (viewsArray, workflowStepId) => {
    return viewsArray.find((v) => v.workflowStepId === workflowStepId);
  };
  const findHeaderByViewId = (viewId) => {
    return headers.find((vh) => vh.viewId === viewId)?.headerId;
  };

  const clearWorkflowState = () => {
    dispatch(setWorkflowToInitial());
  };

  const updateNodesEdgesAndViewport = (nodes, edges, viewport) => {
    dispatch(changeNodesEdgesAndViewport({ nodes, edges, viewport }));
  };

  const updateWorkflowValue = (name, value) => {
    dispatch(changeWorkflowValue({ value, name }));
  };

  // WORKFLOW-STEP

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

  const updateWorkflowStepValue = (name, value, workflowStepId) => {
    dispatch(changeWorkflowStepValue({ name, value, stepId: workflowStepId }));
  };

  const deleteWorkflowStep = (step) => {
    const workflowStepId = step.id;
    const viewType = step.viewType;
    deleteView(viewType, workflowStepId);
    dispatch(removeWorkflowStep({ id: workflowStepId }));
    updateSelectedStep("");
  };

  // LAUNCH-ELEMENT

  const createLaunchElementOnDrop = (launchType, workflowStepId) => {
    const template = {
      launchElementId: workflowStepId + "-launch",
      workflowStepId: workflowStepId,
      launchType: parseInt(launchType),
      name: "",
      description: "",
    };
    createWorkflowStep(workflowStepId);
    dispatch(addLaunchElement({ launchElement: template }));
  };

  const updateLaunchElementValue = (name, value, workflowStepId) => {
    console.log({ name, value, workflowStepId });
    dispatch(changeLaunchElementValue({ name, value, workflowStepId }));
  };

  const deleteLaunchElement = (workflowStepId) => {
    dispatch(removeLaunchElement({ workflowStepId }));
  };

  // LIST-VIEW-ELEMENT-ROW

  const createListViewElementRow = (listViewElementId) => {
    const template = {
      listViewElementRowId: generateRandomId("lvr-", null),
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

  // LIST-VIEW-ELEMENT

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

  // LIST-VIEW

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
    createWorkflowStep(workflowStepId);
    dispatch(addListView({ listView: template }));
    createListViewElement(listViewElementId);
    createViewHeaderWithRowsAndColumns(
      listViewId,
      workflowStepTypeIds.LISTVIEW,
      headerId
    );
  };
  const updateListViewValue = (name, value, viewId) => {
    dispatch(changeListViewValue({ name, value, viewId }));
  };
  const deleteListView = (workflowStepId) => {
    const listViewToDelete = findViewByStepId(listViews, workflowStepId);
    const listViewId = listViewToDelete.listViewId;
    const listViewElementId = listViewToDelete.listViewElementId;

    const headerId = findHeaderByViewId(listViewId);
    deleteViewHeader(headerId);
    dispatch(removeLaunchElement({ workflowStepId }));

    deleteListViewElement(listViewElementId);
    dispatch(removeListView({ viewId: listViewId }));
  };
  // LIST-VIEW-FILTER-DEFINITION

  const createListViewFilterDefinition = (listViewId) => {
    const filterDefinitionTemplate = {
      filterDefinitionId: "",
      listViewId: "",
      fieldId: null,
      filterValue: "",
    };

    const newFilterDefinition = {
      ...filterDefinitionTemplate,
      filterDefinitionId: generateRandomId("filter-def", null),
      listViewId,
    };

    dispatch(
      addListViewFilterDefinition({ filterDefinition: newFilterDefinition })
    );
  };
  const updateFilterDefinitionValue = (name, value, definitionID) => {
    dispatch(
      changeListViewFilterDefinitionValue({ name, value, definitionID })
    );
  };

  const deleteFilterDefinition = (definitionID) => {
    dispatch(removeListViewFilterDefinition({ definitionID }));
  };

  // RECORD-VIEW

  const createRecordViewOnDrop = (workflowStepId) => {
    const recordViewId = workflowStepId + "-recordview";
    const headerId = `${recordViewId}-vh`;

    const template = {
      recordViewId: recordViewId,
      workflowStepId: workflowStepId,
      entityId: null,
      headerId: headerId || "",
      isEditable: false,
      showMenue: true,
      createNewDataset: false,
    };
    createWorkflowStep(workflowStepId);
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

    const headerId = findHeaderByViewId(recordViewId);
    deleteViewHeader(headerId);
    dispatch(removeRecordView({ viewId: recordViewId }));
  };

  // RECORD-VIEW-FIELDS

  const createRecordViewField = (recordViewId) => {
    const generatedID = generateRandomId(null, "-record-field");

    const recordViewTemplate = {
      recordViewFieldId: generatedID,
      recordViewId: recordViewId,
      fieldId: null,
      differingCaption: "",
      isDefault: false,
      isReadOnly: false,
      imageMode: null,
      imageGroupCaption: null,
      imageType: null,
      sortOrder: null,
    };
    dispatch(addRecordViewField({ newRecordField: recordViewTemplate }));
  };

  const updateRecordViewFieldValue = (name, value, fieldID) => {
    dispatch(changeRecordViewFieldValue({ name, value, fieldID }));
  };

  const updateAllRecordViewFields = (recordViewId, fields) => {
    dispatch(changeAllRecordViewFields({ recordViewId, fields }));
  };

  const deleteRecordViewField = (fieldID) => {
    dispatch(removeRecordViewField({ fieldID }));
  };

  // RECORD-VIEW-FUNCTIONS

  const updateAllRecordViewFunctions = (recordViewId, recordFunctions) => {
    dispatch(changeAllRecordViewFunctions({ recordViewId, recordFunctions }));
  };

  // VIEW-HEADER
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
    console.log({ headerColumnIds, headerRowIds });
    headerRowIds.forEach((vhrId) => deleteViewHeaderRow(vhrId));
    headerColumnIds.forEach((vhcId) => deleteViewHeaderColumn(vhcId));
    dispatch(
      removeViewHeader({
        viewHeaderId: viewHeaderId,
      })
    );
  };

  // VIEW-HEADER-ROW
  const createViewHeaderRow = (headerId) => {
    const rowId = generateRandomId("vhr-", null);
    const template = {
      headerRowId: rowId,
      headerId: headerId,
      rowAlignment: 0,
    };

    dispatch(addViewHeaderRow({ viewHeaderRow: template }));
    createViewHeaderColumn(rowId);
    createViewHeaderColumn(rowId);
  };

  const deleteViewHeaderRow = (rowId) => {
    dispatch(removeViewHeaderRow({ rowId }));
  };

  // VIEW-HEADER-COLUMN
  const createViewHeaderColumn = (headerRowId) => {
    const columnId = () => generateRandomId("vhc-", null);
    const template = {
      headerRowID: headerRowId,
      columnType: 3,
      rowSpan: 1,
      fontColor: "#FFFFFF",
    };

    const column = {
      ...template,
      headerColumnId: columnId(),
      columnValue: "user.userName",
      colSpan: 2,
      textAlignment: 0,
      fontFamily: 3,
    };

    dispatch(addViewHeaderColumn({ viewHeaderColumn: column }));
  };
  const updateViewHeaderColumnValue = (name, value, columnId) => {
    dispatch(changeViewHeaderColumnValue({ name, value, columnId }));
  };
  const deleteViewHeaderColumn = (columnId) => {
    dispatch(removeViewHeaderColumn({ columnId }));
  };

  // SCANNER-DIALOG
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
      targetFieldId: null,
      entityId: "",
      name: "",
      description: "",
      filterField: "",
      allowManualInput: true,
      inputDataSourceId: null,
      headerId: headerId,
    };
    createWorkflowStep(workflowStepId);
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
      targetFieldId: null,
      entityId: "",
      name: "",
      description: "",
      filterField: "",
      allowManualInput: true,
      inputDataSourceId: null,
      headerId: "",
    };
    createWorkflowStep(workflowStepId);
    createScannerDialog(template);
  };
  const updateScannerDialogValue = (name, value, scannerDialogId) => {
    dispatch(
      changeScannerDialogValue({ name, value, dialogId: scannerDialogId })
    );
  };
  const deleteScannerDialogNFC = (workflowStepId) => {
    const scannerDialogToDelete = findViewByStepId(
      scannerDialogs,
      workflowStepId
    );
    const dialogId = scannerDialogToDelete.scannerDialogId;
    const headerId = findHeaderByViewId(dialogId);
    deleteViewHeader(headerId);
    dispatch(removeScannerDialog({ stepId: workflowStepId }));
  };
  const deleteScannerDialogQR = (workflowStepId) => {
    dispatch(removeScannerDialog({ stepId: workflowStepId }));
  };

  // MODAL-DIALOG

  const createModalDialog = (workflowStepId) => {
    const modalId = workflowStepId + "-modal";

    const template = {
      modalDialogId: modalId,
      workflowStepId: workflowStepId,
      fieldId: "",
      okButton: "Ja",
      cancelButton: "Nein",
      caption: "",
      userText: "",
      newValue: "",
    };
    createWorkflowStep(workflowStepId);
    dispatch(addModalDialog({ modalDialog: template }));
  };

  const updateModalDialogValue = (name, value, modalId) => {
    dispatch(changeModalDialogValue({ name, value, modalId }));
  };

  const deleteModalDialog = (workflowStepId) => {
    dispatch(removeModalDialog({ stepId: workflowStepId }));
  };

  // TILE-VIEW

  const createTileViewOnDrop = () => {
    const viewId = workflowId;
    const headerId = viewId + "-vh";
    createViewHeaderWithRowsAndColumns(
      viewId,
      workflowStepTypeIds.TILEVIEW,
      headerId
    );
  };

  const deleteTileView = () => {
    const viewId = workflowId;
    const headerId = viewId + "-vh";
    deleteViewHeader(headerId);
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
    } else if (viewType === viewTypeConstants.MODALDIALOG) {
      createModalDialog(workflowStepId);
    } else if (viewType === viewTypeConstants.TILEVIEW) {
      createTileViewOnDrop();
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
    } else if (viewType === viewTypeConstants.MODALDIALOG) {
      deleteModalDialog(workflowStepId);
    } else if (viewType === viewTypeConstants.TILEVIEW) {
      deleteTileView();
    } else if (isLaunchElement(viewType)) {
      deleteLaunchElement(workflowStepId);
    }
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
      clearWorkflowState();
    }
  };

  const prepareWorkflowStateForPost = (nodes, edges, viewport) => {
    const tempWorkflow = { ...workflow };
    delete tempWorkflow.selectedStepId;
    tempWorkflow.edges = JSON.stringify(edges);
    tempWorkflow.nodes = JSON.stringify(nodes);
    tempWorkflow.viewport = JSON.stringify(viewport);
    return tempWorkflow;
  };

  return {
    //HELPER-FUNCTIONS
    prepareEntityFields,
    clearWorkflowState,
    generateRandomId,
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
    updateWorkflowValue,
    updateWorkflowStepValue,
    updateSelectedStep,
    updateNodesEdgesAndViewport,
    updateLaunchElementValue,
    updateScannerDialogValue,
    updateModalDialogValue,
    updateRecordViewValue,
    updateListViewValue,
    updateListViewElementValue,
    updateListViewElementRowValue,
    updateViewHeaderValue,
    updateViewHeaderColumnValue,
    restoreWorkflowState,
    setPreviousAndNextStepsOnConnect,
    prepareWorkflowStateForPost,

    //RECORD_VIEW_FIELD
    createRecordViewField,
    updateRecordViewFieldValue,
    updateAllRecordViewFields,
    deleteRecordViewField,

    //RECORD_VIEW_FUNCTION
    updateAllRecordViewFunctions,

    //LIST-VIEW-FILTER-DEFINITION

    createListViewFilterDefinition,
    updateFilterDefinitionValue,
    deleteFilterDefinition,
  };
};

export default useWorkflowForms;
