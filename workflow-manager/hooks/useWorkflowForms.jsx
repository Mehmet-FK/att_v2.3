import {
  scannerActionConstants,
  scannerTypeConstants,
  viewTypeConstants,
  workflowStepTypeIds,
} from "@/helpers/Constants";
import { toastErrorNotify } from "@/helpers/ToastNotify";
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
  changeNextStepOnCancel,
  changeNextStepOnConfirm,
  removeWorkflowRelay,
  addWorkdlowRelay,
  changeWorkflowRelayValue,
  addListViewDefaultFilter,
  changeListViewDefaultFilterValue,
  removeListViewDefaultFilter,
  removeDefaultFilterByListViewID,
  removeFilterDefinitionByListViewID,
  removeFunctionsByRecordViewID,
  removeRecordViewFieldsByRecordViewID,
  removeRowsByHeaderID,
  removeColumnsByRowID,
  addInfoScreen,
  changeInfoScreenValue,
  removeInfoScreen,
} from "@/redux/slices/workflowSlice";
import { useDispatch, useSelector } from "react-redux";
import WorkflowStep from "../models/WorkflowStep";
import LaunchElement from "../models/LaunchElement";
import ListViewElementRow from "../models/listview/ListViewElementRow";
import ListViewElement from "../models/listview/ListViewElement";
import ListView from "../models/listview/ListView";
import ListViewFilterDefinition from "../models/listview/ListViewFilterDefinition";
import ListViewDefaultFilterDefinition from "../models/listview/ListViewDefaultFilterDefinition";
import RecordView from "../models/recordview/RecordView";
import RecordViewField from "../models/recordview/RecordViewField";
import ViewHeader from "../models/view-header/ViewHeader";
import ViewHeaderRow from "../models/view-header/ViewHeaderRow";
import ViewHeaderColumn from "../models/view-header/ViewHeaderColumn";
import ModalDialog from "../models/modal-dialog/ModalDialog";
import InfoScreen from "../models/InfoScreen";
import ScannerDialog from "../models/ScannerDialog";
import WorkflowRelay from "../models/WorkflowRelay";

const useWorkflowForms = () => {
  const dispatch = useDispatch();
  const workflow = useSelector((state) => state.workflow);

  const {
    selectedStepId,
    workflowId,
    workflowSteps,
    recordViews,
    scannerDialogs,
    listViews,
    infoScreens,
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
      type: field.type,
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

  //! WORKFLOW-STEP

  const createWorkflowStep = (stepID) => {
    const step = new WorkflowStep({
      workflowStepId: stepID,
      workflowId: workflowId,
    }).toObject();
    console.log(step);
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

  //! LAUNCH-ELEMENT

  const createLaunchElementOnDrop = (launchType, workflowStepId) => {
    const launchElement = new LaunchElement({
      workflowStepId: workflowStepId,
      launchType: parseInt(launchType),
    }).toObject();
    createWorkflowStep(workflowStepId);
    dispatch(addLaunchElement({ launchElement: launchElement }));
  };

  const updateLaunchElementValue = (name, value, workflowStepId) => {
    dispatch(changeLaunchElementValue({ name, value, workflowStepId }));
  };

  const deleteLaunchElement = (workflowStepId) => {
    dispatch(removeLaunchElement({ workflowStepId }));
  };

  //! LIST-VIEW-ELEMENT-ROW

  const createListViewElementRow = (listViewElementId) => {
    const listViewElementRow = new ListViewElementRow({
      listViewElementId: listViewElementId,
    }).toObject();

    dispatch(addListViewElementRow({ elementRow: listViewElementRow }));
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

  //! LIST-VIEW-ELEMENT

  const createListViewElement = (listViewElementId) => {
    const listViewElement = new ListViewElement({
      listViewElementId: listViewElementId,
    }).toObject();

    dispatch(addListViewElement({ listViewElement: listViewElement }));
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

  //! LIST-VIEW

  const createListViewOnDrop = (workflowStepId) => {
    const listView = new ListView({ workflowStepId }).toObject();

    createWorkflowStep(workflowStepId);
    dispatch(addListView({ listView: listView }));
    createListViewElement(listView.listViewElementId);
    createViewHeaderWithRowsAndColumns(
      listView.listViewId,
      workflowStepTypeIds.LISTVIEW,
      listView.headerId
    );
  };
  const updateListViewValue = (name, value, viewId) => {
    dispatch(changeListViewValue({ name, value, viewId }));
  };
  const deleteListView = (workflowStepId) => {
    const listViewToDelete = findViewByStepId(listViews, workflowStepId);
    const listViewId = listViewToDelete.listViewId;
    const listViewElementId = listViewToDelete.listViewElementId;

    // Header
    const headerId = findHeaderByViewId(listViewId);
    deleteViewHeader(headerId);

    // Element
    deleteListViewElement(listViewElementId);

    //Filter Definition
    deleteFilterDefinitionByListViewID(listViewId);

    //DefaultFilter
    deleteDefaultFilterByListViewID(listViewId);

    dispatch(removeListView({ viewId: listViewId }));
  };

  //! LIST-VIEW-DEFAULT-FILTER
  const createListViewDefaultFilter = (listviewID) => {
    const defaultFilter = new ListViewDefaultFilterDefinition({
      listViewId: listviewID,
    }).toObject();
    dispatch(addListViewDefaultFilter({ defaultFilter: defaultFilter }));
  };

  const updateDefaultListViewFilterValue = (name, value, filterId) => {
    dispatch(changeListViewDefaultFilterValue({ name, value, filterId }));
  };

  const deleteDefaultListViewFilter = (filterId) => {
    dispatch(removeListViewDefaultFilter({ filterId }));
  };

  const deleteDefaultFilterByListViewID = (listViewId) => {
    dispatch(removeDefaultFilterByListViewID({ listViewId }));
  };

  //! LIST-VIEW-FILTER-DEFINITION

  const createListViewFilterDefinition = (listViewId) => {
    const filterDefinition = new ListViewFilterDefinition({
      listViewId,
    }).toObject();

    dispatch(
      addListViewFilterDefinition({ filterDefinition: filterDefinition })
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

  const deleteFilterDefinitionByListViewID = (listViewId) => {
    dispatch(removeFilterDefinitionByListViewID({ listViewId }));
  };

  //! RECORD-VIEW
  const createRecordViewOnDrop = (workflowStepId) => {
    const recordView = new RecordView({ workflowStepId }).toObject();
    createWorkflowStep(workflowStepId);
    dispatch(addRecordView({ recordView: recordView }));
    createViewHeaderWithRowsAndColumns(
      recordView.recordViewId,
      workflowStepTypeIds.RECORDVIEW,
      recordView.headerId
    );
  };

  const updateRecordViewValue = (name, value, recordViewId) => {
    dispatch(changeRecordViewValue({ name, value, viewId: recordViewId }));
  };

  const deleteRecordView = (workflowStepId) => {
    const recordViewToDelete = findViewByStepId(recordViews, workflowStepId);
    const recordViewId = recordViewToDelete.recordViewId;

    //Header
    const headerId = findHeaderByViewId(recordViewId);
    deleteViewHeader(headerId);

    //Record Fields
    deleteFieldsByRecordViewID(recordViewId);

    //Record Functions
    deleteFunctionsByRecordViewID(recordViewId);

    dispatch(removeRecordView({ viewId: recordViewId }));
  };

  //! RECORD-VIEW-FIELDS
  const createRecordViewField = (recordViewFieldId) => {
    const recordField = new RecordViewField({ recordViewFieldId }).toObject();
    dispatch(addRecordViewField({ newRecordField: recordField }));
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

  const deleteFieldsByRecordViewID = (recordViewId) => {
    dispatch(removeRecordViewFieldsByRecordViewID({ recordViewId }));
  };

  //! RECORD-VIEW-FUNCTIONS
  const updateAllRecordViewFunctions = (recordViewId, recordFunctions) => {
    dispatch(changeAllRecordViewFunctions({ recordViewId, recordFunctions }));
  };

  const deleteFunctionsByRecordViewID = (recordViewId) => {
    dispatch(removeFunctionsByRecordViewID({ recordViewId }));
  };

  //! VIEW-HEADER
  const createViewHeaderWithRowsAndColumns = (viewId, viewType, headerId) => {
    //Header
    createViewHeader(viewId, viewType, headerId);

    //Header Row and Columns
    createViewHeaderRow(headerId);
  };

  const createViewHeader = (viewId, viewType, headerId) => {
    const viewHeader = new ViewHeader({
      viewId,
      viewType,
      headerId,
    }).toObject();

    dispatch(addViewHeader({ viewHeader: viewHeader }));
  };

  const updateViewHeaderValue = (name, value, headerId) => {
    dispatch(changeViewHeaderValue({ name, value, viewHeaderId: headerId }));
  };

  const deleteViewHeader = (viewHeaderId) => {
    const filteredRows = headerRows.filter(
      (vhr) => vhr.headerId === viewHeaderId
    );
    //Delete Header Rows
    deleteRowsByHeaderID(viewHeaderId);

    //Delete Header Columns
    filteredRows.forEach((row) => deleteColumnsByRowID(row.headerRowId));

    dispatch(
      removeViewHeader({
        viewHeaderId: viewHeaderId,
      })
    );
  };

  //! VIEW-HEADER-ROW
  const createViewHeaderRow = (headerId) => {
    const rowId = generateRandomId("vhr-", null);

    const headerRow = new ViewHeaderRow({ headerId }).toObject();

    dispatch(addViewHeaderRow({ viewHeaderRow: headerRow }));

    //Column 1
    const column1 = new ViewHeaderColumn({
      headerRowID: headerRow.headerRowId,
      columnValue: "user.userName",
    }).toObject();
    createViewHeaderColumn(rowId, column1);
    //Column 2
    const column2 = new ViewHeaderColumn({
      headerRowID: headerRow.headerRowId,
      columnValue: "user.number",
      textAlignment: 1,
      fontFamily: 7,
    }).toObject();
    console.log({ ...column2 });
    createViewHeaderColumn(headerRow.headerRowId, column2);
  };

  const deleteViewHeaderRow = (rowId) => {
    dispatch(removeViewHeaderRow({ rowId }));
  };
  const deleteRowsByHeaderID = (headerID) => {
    dispatch(removeRowsByHeaderID({ headerID }));
  };

  //! VIEW-HEADER-COLUMN
  const createViewHeaderColumn = (headerRowId, defaultColumn = null) => {
    const headerColumn = new ViewHeaderColumn({
      headerRowID: headerRowId,
      columnValue: "user.userName",
    }).toObject();
    dispatch(
      addViewHeaderColumn({ viewHeaderColumn: defaultColumn ?? headerColumn })
    );
  };
  const updateViewHeaderColumnValue = (name, value, columnId) => {
    dispatch(changeViewHeaderColumnValue({ name, value, columnId }));
  };
  const deleteViewHeaderColumn = (columnId) => {
    dispatch(removeViewHeaderColumn({ columnId }));
  };
  const deleteColumnsByRowID = (rowID) => {
    dispatch(removeColumnsByRowID({ rowID }));
  };

  //! SCANNER-DIALOG
  const createScannerDialog = (dialogTemplate) => {
    dispatch(addScannerDialog({ scannerDialog: dialogTemplate }));
  };
  const createScannerDialogNFC = (workflowStepId) => {
    const nfcScanner = new ScannerDialog({
      workflowStepId: workflowStepId,
      scannerType: scannerTypeConstants.NFC,
      scannerAction: scannerActionConstants.ENTITY,
    }).toObject();

    createWorkflowStep(workflowStepId);
    createScannerDialog(nfcScanner);
    createViewHeaderWithRowsAndColumns(
      nfcScanner.scannerDialogId,
      workflowStepTypeIds.SCANNER_DIALOG,
      nfcScanner.headerId
    );
  };
  const createScannerDialogQR = (workflowStepId, viewType) => {
    const qrScanner = new ScannerDialog({
      workflowStepId: workflowStepId,
      scannerType: scannerTypeConstants.QR,
      scannerAction: scannerActionConstants.ENTITY,
    }).toObject();

    createWorkflowStep(workflowStepId);
    createScannerDialog(qrScanner);
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

  //! MODAL-DIALOG

  const createModalDialog = (workflowStepId) => {
    const modalDialog = new ModalDialog({ workflowStepId }).toObject();

    createWorkflowStep(workflowStepId);
    dispatch(addModalDialog({ modalDialog: modalDialog }));
  };

  const updateModalDialogValue = (name, value, modalId) => {
    dispatch(changeModalDialogValue({ name, value, modalId }));
  };

  const deleteModalDialog = (workflowStepId) => {
    dispatch(removeModalDialog({ stepId: workflowStepId }));
  };

  //! INFO SCREEN
  const createInfoScreen = (workflowStepId) => {
    const infoScreen = new InfoScreen({ workflowStepId }).toObject();

    createWorkflowStep(workflowStepId);
    dispatch(addInfoScreen({ infoScreen: infoScreen }));
    createViewHeaderWithRowsAndColumns(
      infoScreen.infoScreenId,
      workflowStepTypeIds.INFO_SCREEN,
      infoScreen.headerId
    );
  };

  const updateInfoScreenValue = (name, value, screenID) => {
    dispatch(changeInfoScreenValue({ name, value, screenID }));
  };
  const deleteInfoScreen = (workflowStepId) => {
    const infoScreenToDelete = findViewByStepId(infoScreens, workflowStepId);
    const screenID = infoScreenToDelete?.infoScreenId;

    //Header
    const headerId = findHeaderByViewId(screenID);
    deleteViewHeader(headerId);

    //Info Screen
    dispatch(removeInfoScreen({ stepID: workflowStepId }));
  };

  //! TILE-VIEW
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

  //! WORKFLOW-RELAY
  const createWorkflowRelayOnDrop = (workflowStepId) => {
    const workflowRelay = new WorkflowRelay({ workflowStepId }).toObject();
    createWorkflowStep(workflowStepId);
    dispatch(addWorkdlowRelay({ workflowRelay: workflowRelay }));
  };

  const updateWorkflowRelayValue = (name, value, relayId) => {
    dispatch(changeWorkflowRelayValue({ name, value, relayId }));
  };

  const deleteWorkflowRelay = (workflowStepId) => {
    dispatch(removeWorkflowRelay({ stepId: workflowStepId }));
  };

  //!

  //! COMMON-CALLS

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
    } else if (viewType === viewTypeConstants.WORKFLOW_RELAY) {
      createWorkflowRelayOnDrop(workflowStepId);
    } else if (viewType === viewTypeConstants.INFO_SCREEN) {
      createInfoScreen(workflowStepId);
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
    } else if (viewType === viewTypeConstants.WORKFLOW_RELAY) {
      deleteWorkflowRelay(workflowStepId);
    } else if (viewType === viewTypeConstants.INFO_SCREEN) {
      deleteInfoScreen(workflowStepId);
    } else if (isLaunchElement(viewType)) {
      deleteLaunchElement(workflowStepId);
    }
  };

  const updateSelectedStep = (stepId) => {
    if (selectedStepId === stepId) return;
    dispatch(updateStep({ stepId }));
  };

  const isStepConditional = (sourceHandle) => {
    const conditionHandleIds = ["a_bottom", "a_top"];
    return conditionHandleIds.includes(sourceHandle);
  };

  const updateModalNextStep = (params) => {
    const confirmHandleID = "a_top";
    const cancelHandleID = "a_bottom";
    const sourceHandleID = params?.sourceHandle;

    const workflowStepID = params.source;
    const nextStepID = params.target;

    if (sourceHandleID === confirmHandleID) {
      dispatch(
        changeNextStepOnConfirm({
          nextStepId: nextStepID,
          stepId: workflowStepID,
        })
      );
    } else if (sourceHandleID === cancelHandleID) {
      dispatch(
        changeNextStepOnCancel({
          nextStepId: nextStepID,
          stepId: workflowStepID,
        })
      );
    }

    const wfs = workflowSteps.find((wfs) => wfs.workflowStepId === nextStepID);
    if (wfs?.previousStep === "") {
      dispatch(
        changeWorkflowStepValue({
          name: "previousStep",
          value: workflowStepID,
          stepId: nextStepID,
        })
      );
    }
  };

  const setPreviousAndNextStepsOnConnect = (params) => {
    const previousStepId = params.source;
    const nextStepId = params.target;
    if (isStepConditional(params.sourceHandle)) {
      updateModalNextStep(params);
    } else {
      dispatch(
        changeNextAndPreviousStep({
          nextStepId: nextStepId,
          previousStepId: previousStepId,
        })
      );
    }
  };
  const updatePreviousAndNextStepOnDeleteEdge = (deletedEdges) => {
    if (deletedEdges?.length < 1) return;

    deletedEdges.forEach((ed) => {
      const sourceStep = ed.sourceID;
      const targetStep = ed.targetID;
      dispatch(
        changeWorkflowStepValue({
          name: "nextStep",
          value: "",
          stepId: sourceStep,
        })
      );
      dispatch(
        changeWorkflowStepValue({
          name: "previousStep",
          value: "",
          stepId: targetStep,
        })
      );
    });
  };

  const restoreWorkflowState = (workflow) => {
    if (workflow) {
      dispatch(updateTotalWorkflow({ workflow }));
    } else {
      clearWorkflowState();
    }
  };

  const assignStepNamesToNodes = (workflowSteps, nodes) => {
    const nodesMap = nodes.toHashMap("id");

    workflowSteps.forEach((wfs) => {
      if (nodesMap[wfs.workflowStepId]) {
        nodesMap[wfs.workflowStepId].name = wfs.name;
      }
    });
    return Object.values(nodesMap);
  };

  const updateEdgesToMatchNodes = (nodes, edges) => {
    const nodesMap = nodes.toHashMap("id");
    const updatedEdges = edges.flatMap((edg) => {
      const edge = { ...edg };
      const sourceNode = nodesMap[edg.source];
      const targetNode = nodesMap[edg.target];

      if (!sourceNode || !targetNode) return [];
      edge.sourceID = sourceNode.name;
      edge.targetID = targetNode.name;
      return edge;
    });
    return updatedEdges;
  };

  const prepareWorkflowStateForPost = (nodes, edges, viewport) => {
    const tempWorkflow = { ...workflow };
    delete tempWorkflow.selectedStepId;

    const updatedNodes = assignStepNamesToNodes(workflowSteps, nodes);
    const updatedEdges = updateEdgesToMatchNodes(nodes, edges);

    tempWorkflow.edges = JSON.stringify(updatedEdges);
    tempWorkflow.nodes = JSON.stringify(updatedNodes);
    tempWorkflow.viewport = JSON.stringify(viewport);
    return tempWorkflow;
  };

  const validateWorkflowSteps = (workflowSteps) => {
    let validationFlag = true;
    const uniqueNames = new Map();
    const duplicateNames = [];

    workflowSteps.forEach((wfs) => {
      const stepName = wfs.name.replaceAll(" ", "");
      if (!uniqueNames[stepName]) {
        uniqueNames[stepName] = true;
      } else {
        duplicateNames.push(wfs.name);
      }
    });

    duplicateNames.forEach((dpn) => {
      toastErrorNotify(`Workflow Step Name ${dpn} ist nicht eindeutig!! `);
      validationFlag = false;
    });

    return validationFlag;
  };

  const validateWorkflowForSubmit = (workflow) => {
    let validationFlag = true;

    const workflowSteps = workflow.workflowSteps;
    validationFlag = validateWorkflowSteps(workflowSteps);

    return validationFlag;
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
    updatePreviousAndNextStepOnDeleteEdge,
    prepareWorkflowStateForPost,
    validateWorkflowForSubmit,

    //RECORD_VIEW_FIELD
    createRecordViewField,
    updateRecordViewFieldValue,
    updateAllRecordViewFields,
    deleteRecordViewField,

    //RECORD_VIEW_FUNCTION
    updateAllRecordViewFunctions,

    //LSTVIEW DEFAULT FILTER
    createListViewDefaultFilter,
    updateDefaultListViewFilterValue,
    deleteDefaultListViewFilter,

    //LIST-VIEW-FILTER-DEFINITION
    createListViewFilterDefinition,
    updateFilterDefinitionValue,
    deleteFilterDefinition,

    //WORKFLOW RELAY
    updateWorkflowRelayValue,

    //INFO SCREEN
    updateInfoScreenValue,
  };
};

export default useWorkflowForms;
