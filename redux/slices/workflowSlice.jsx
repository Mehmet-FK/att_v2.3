import { createSlice } from "@reduxjs/toolkit";

const _initialState = {
  selectedStepId: "",
  workflowId: "new-wf",
  entityId: "",
  name: "",
  caption: "",
  description: "",
  icon: "",
  isActive: true,
  isProduction: false,
  permissionType: "0",
  parentWorkflowId: "",
  edges: [],
  nodes: [],
  viewport: {},
  workflowSteps: [],
  launchElements: [],
  workflowRelays: [],
  scannerDialogs: [],
  listViews: [],
  listViewDefaultFilters: [],
  listViewElements: [],
  listViewElementRows: [],
  listViewFilterDefinitions: [],
  recordViews: [],
  recordViewFunctions: [],
  recordViewFields: [],
  modalDialogs: [],
  headers: [],
  headerRows: [],
  headerColumns: [],
  itemsToDelete: null,
};

const workflowSlice = createSlice({
  name: "workflow",

  initialState: _initialState,
  reducers: {
    setWorkflowToInitial: () => {
      console.log({ setWorkflowToInitial: new Date() });
      return _initialState;
    },

    updateSelectedStep: (state, { payload: { stepId } }) => {
      if (state.selectedStepId !== stepId) {
        state.selectedStepId = stepId;
      }
    },

    changeNodesEdgesAndViewport: (
      state,
      { payload: { nodes, edges, viewport } }
    ) => {
      state.nodes = nodes;
      state.edges = edges;
      state.viewport = viewport;
    },

    updateTotalWorkflow: (state, { payload: { workflow } }) => {
      console.log({ updateTotalWorkflow: new Date() });

      for (const key in workflow) {
        state[key] = workflow[key];
      }
    },

    changeWorkflowValue: (state, { payload: { value, name } }) => {
      if (state[name] !== value) {
        state[name] = value;
      }
    },
    addWorkflowStep: (state, { payload: { step } }) => {
      state.workflowSteps.push(step);
    },
    removeWorkflowStep: (state, { payload: { id } }) => {
      state.workflowSteps = state.workflowSteps.filter(
        (step) => step.workflowStepId !== id
      );
    },
    changeNextAndPreviousStep: (
      state,
      { payload: { nextStepId, previousStepId } }
    ) => {
      state.workflowSteps = state.workflowSteps.map((wfs) => {
        if (wfs.workflowStepId === nextStepId) {
          const temp = { ...wfs, previousStep: previousStepId };
          return temp;
        } else if (wfs.workflowStepId === previousStepId) {
          const temp = { ...wfs, nextStep: nextStepId };
          return temp;
        } else {
          return wfs;
        }
      });
    },
    changeWorkflowStepValue: (state, { payload: { name, value, stepId } }) => {
      state.workflowSteps = state.workflowSteps.map((wfs) => {
        if (wfs.workflowStepId === stepId) {
          return { ...wfs, [name]: value };
        } else {
          return wfs;
        }
      });
    },

    addLaunchElement: (state, { payload: { launchElement } }) => {
      state.launchElements.push(launchElement);
    },

    changeLaunchElementValue: (
      state,
      { payload: { name, value, workflowStepId } }
    ) => {
      state.launchElements = state.launchElements.map((launchEl) => {
        if (launchEl.workflowStepId === workflowStepId) {
          return { ...launchEl, [name]: value };
        } else {
          return launchEl;
        }
      });
    },

    removeLaunchElement: (state, { payload: { workflowStepId } }) => {
      state.launchElements = state.launchElements.filter(
        (launchEl) => launchEl.workflowStepId !== workflowStepId
      );
    },
    //! RECORD-VIEW

    addRecordView: (state, { payload: { recordView } }) => {
      state.recordViews.push(recordView);
    },
    changeRecordViewValue: (state, { payload: { name, value, viewId } }) => {
      state.recordViews = state.recordViews.map((rv) => {
        if (rv.recordViewId === viewId) {
          return { ...rv, [name]: value };
        } else {
          return rv;
        }
      });
    },

    removeRecordView: (state, { payload: { viewId } }) => {
      state.recordViews = state.recordViews.filter(
        (rv) => rv.recordViewId !== viewId
      );
    },

    //! RECORD-VIEW-FIELD
    addRecordViewField: (state, { payload: { newRecordField } }) => {
      state.recordViewFields.push(newRecordField);
    },
    changeRecordViewFieldValue: (
      state,
      { payload: { name, value, fieldID } }
    ) => {
      state.recordViewFields = state.recordViewFields.map((rvf) => {
        if (rvf.recordViewFieldId === fieldID) {
          return { ...rvf, [name]: value };
        } else {
          return rvf;
        }
      });
    },

    changeAllRecordViewFields: (
      state,
      { payload: { recordViewId, fields } }
    ) => {
      const otherFields = state.recordViewFields.filter(
        (rvf) => rvf.recordViewId !== recordViewId
      );
      state.recordViewFields = otherFields.concat(fields);
    },

    removeRecordViewField: (state, { payload: { fieldID } }) => {
      state.recordViewFields = state.recordViewFields.filter(
        (rvf) => rvf.recordViewFieldId !== fieldID
      );
    },
    removeRecordViewFieldsByRecordViewID: (
      state,
      { payload: { recordViewId } }
    ) => {
      state.recordViewFields = state.recordViewFields.filter(
        (rvf) => rvf.recordViewId !== recordViewId
      );
    },

    //! RECORD-VIEW-FUNCTION
    changeAllRecordViewFunctions: (
      state,
      { payload: { recordViewId, recordFunctions } }
    ) => {
      const otherFunctions = state.recordViewFunctions.filter(
        (rvf) => rvf.recordViewId !== recordViewId
      );
      state.recordViewFunctions = otherFunctions.concat(recordFunctions);
    },

    removeFunctionsByRecordViewID: (state, { payload: { recordViewId } }) => {
      state.recordViewFunctions = state.recordViewFunctions.filter(
        (rvf) => rvf.recordViewId !== recordViewId
      );
    },

    //! LIST-VIEW
    addListView: (state, { payload: { listView } }) => {
      state.listViews.push(listView);
    },

    changeListViewValue: (state, { payload: { name, value, viewId } }) => {
      state.listViews = state.listViews.map((lv) => {
        if (lv.listViewId === viewId) {
          return { ...lv, [name]: value };
        } else {
          return lv;
        }
      });
    },
    removeListView: (state, { payload: { viewId } }) => {
      state.listViews = state.listViews.filter(
        (lv) => lv.listViewId !== viewId
      );
    },

    addListViewElement: (state, { payload: { listViewElement } }) => {
      state.listViewElements.push(listViewElement);
    },

    changeListViewElementValue: (
      state,
      { payload: { name, value, elementId } }
    ) => {
      state.listViewElements = state.listViewElements.map((lve) => {
        if (lve.listViewElementId === elementId) {
          return { ...lve, [name]: value };
        } else {
          return lve;
        }
      });
    },

    removeListViewElement: (state, { payload: { elementId } }) => {
      state.listViewElements = state.listViewElements.filter(
        (lve) => lve.listViewElementId !== elementId
      );
    },

    addListViewElementRow: (state, { payload: { elementRow } }) => {
      state.listViewElementRows.push(elementRow);
    },

    changeListViewElementRowValue: (
      state,
      { payload: { name, value, rowId } }
    ) => {
      state.listViewElementRows = state.listViewElementRows.map((lver) => {
        if (lver.listViewElementRowId === rowId) {
          return { ...lver, [name]: value };
        } else {
          return lver;
        }
      });
    },

    removeListViewElementRowByElementId: (
      state,
      { payload: { elementId } }
    ) => {
      state.listViewElementRows = state.listViewElementRows.filter(
        (lver) => lver.listViewElementId !== elementId
      );
    },
    removeListViewElementRowByRowId: (state, { payload: { rowId } }) => {
      state.listViewElementRows = state.listViewElementRows.filter(
        (lver) => lver.listViewElementRowId !== rowId
      );
    },

    //! LISTVIEW-DEFAULT-FILTER
    addListViewDefaultFilter: (state, { payload: { defaultFilter } }) => {
      state.listViewDefaultFilters.push(defaultFilter);
    },
    changeListViewDefaultFilterValue: (
      state,
      { payload: { name, value, filterId } }
    ) => {
      state.listViewDefaultFilters = state.listViewDefaultFilters.map(
        (filter) => {
          if (filter.listViewDefaultFilterId === filterId) {
            return { ...filter, [name]: value };
          } else {
            return filter;
          }
        }
      );
    },
    removeListViewDefaultFilter: (state, { payload: { filterId } }) => {
      state.listViewDefaultFilters = state.listViewDefaultFilters.filter(
        (filter) => filter.listViewDefaultFilterId !== filterId
      );
    },
    removeDefaultFilterByListViewID: (state, { payload: { listViewId } }) => {
      state.listViewDefaultFilters = state.listViewDefaultFilters.filter(
        (filter) => filter.listViewId !== listViewId
      );
    },

    //! LISTVIEW-FILTER-DEFINITION
    addListViewFilterDefinition: (state, { payload: { filterDefinition } }) => {
      state.listViewFilterDefinitions.push(filterDefinition);
    },

    changeListViewFilterDefinitionValue: (
      state,
      { payload: { name, value, definitionID } }
    ) => {
      state.listViewFilterDefinitions = state.listViewFilterDefinitions.map(
        (lvfd) => {
          if (lvfd.filterDefinitionId === definitionID) {
            return { ...lvfd, [name]: value };
          } else {
            return lvfd;
          }
        }
      );
    },
    removeListViewFilterDefinition: (state, { payload: { definitionID } }) => {
      state.listViewFilterDefinitions = state.listViewFilterDefinitions.filter(
        (lvfd) => lvfd.filterDefinitionId !== definitionID
      );
    },

    removeFilterDefinitionByListViewID: (
      state,
      { payload: { listViewId } }
    ) => {
      state.listViewFilterDefinitions = state.listViewFilterDefinitions.filter(
        (lvfd) => lvfd.listViewId !== listViewId
      );
    },

    addViewHeader: (state, { payload: { viewHeader } }) => {
      state.headers.push(viewHeader);
    },
    changeViewHeaderValue: (
      state,
      { payload: { name, value, viewHeaderId } }
    ) => {
      state.headers = state.headers.map((vh) => {
        if (vh.headerId === viewHeaderId) {
          return { ...vh, [name]: value };
        } else {
          return vh;
        }
      });
    },
    removeViewHeader: (state, { payload: { viewHeaderId } }) => {
      state.headers = state.headers.filter(
        (vh) => vh.headerId !== viewHeaderId
      );
    },
    addViewHeaderRow: (state, { payload: { viewHeaderRow } }) => {
      state.headerRows.push(viewHeaderRow);
    },
    changeViewHeaderRowValue: (
      state,
      { payload: { name, value, viewHeaderRowId } }
    ) => {
      state.headerRows = state.headerRows.map((vhr) => {
        if (vhr.headerRowId === viewHeaderRowId) {
          return { ...vhr, [name]: value };
        } else {
          return vhr;
        }
      });
    },
    removeViewHeaderRow: (state, { payload: { rowId } }) => {
      state.headerRows = state.headerRows.filter(
        (vhr) => vhr.headerRowId !== rowId
      );
    },

    removeRowsByHeaderID: (state, { payload: { headerID } }) => {
      state.headerRows = state.headerRows.filter(
        (vhr) => vhr.headerId !== headerID
      );
    },

    addViewHeaderColumn: (state, { payload: { viewHeaderColumn } }) => {
      state.headerColumns.push(viewHeaderColumn);
    },

    changeViewHeaderColumnValue: (
      state,
      { payload: { name, value, columnId } }
    ) => {
      state.headerColumns = state.headerColumns.map((vhc) => {
        if (vhc.headerColumnId === columnId) {
          return { ...vhc, [name]: value };
        } else {
          return vhc;
        }
      });
    },

    removeViewHeaderColumn: (state, { payload: { columnId } }) => {
      state.headerColumns = state.headerColumns.filter(
        (vhc) => vhc.headerColumnId !== columnId
      );
    },

    removeColumnsByRowID: (state, { payload: { rowID } }) => {
      state.headerColumns = state.headerColumns.filter(
        (vhc) => vhc.headerRowID !== rowID
      );
    },

    //! SCANNER DIALOG
    addScannerDialog: (state, { payload: { scannerDialog } }) => {
      state.scannerDialogs.push(scannerDialog);
    },

    changeScannerDialogValue: (
      state,
      { payload: { name, value, dialogId } }
    ) => {
      state.scannerDialogs = state.scannerDialogs.map((sc) => {
        if (sc.scannerDialogId === dialogId) {
          return { ...sc, [name]: value };
        } else {
          return sc;
        }
      });
    },

    removeScannerDialog: (state, { payload: { stepId } }) => {
      state.scannerDialogs = state.scannerDialogs.filter(
        (sc) => sc.workflowStepId !== stepId
      );
    },

    //! MODAL DIALOG

    addModalDialog: (state, { payload: { modalDialog } }) => {
      state.modalDialogs.push(modalDialog);
    },

    changeModalDialogValue: (state, { payload: { name, value, modalId } }) => {
      state.modalDialogs = state.modalDialogs.map((md) => {
        if (md.modalDialogId === modalId) {
          return { ...md, [name]: value };
        } else {
          return md;
        }
      });
    },

    removeModalDialog: (state, { payload: { stepId } }) => {
      state.modalDialogs = state.modalDialogs.filter(
        (md) => md.workflowStepId !== stepId
      );
    },

    changeNextStepOnConfirm: (state, { payload: { nextStepId, stepId } }) => {
      state.modalDialogs = state.modalDialogs.map((md) => {
        if (md.workflowStepId === stepId) {
          return { ...md, nextStepOnConfirm: nextStepId };
        } else {
          return md;
        }
      });
    },
    changeNextStepOnCancel: (state, { payload: { nextStepId, stepId } }) => {
      state.modalDialogs = state.modalDialogs.map((md) => {
        if (md.workflowStepId === stepId) {
          return { ...md, nextStepOnCancel: nextStepId };
        } else {
          return md;
        }
      });
    },

    //! WORKFLOW RELAY
    addWorkdlowRelay: (state, { payload: { workflowRelay } }) => {
      state.workflowRelays.push(workflowRelay);
    },

    changeWorkflowRelayValue: (
      state,
      { payload: { name, value, relayId } }
    ) => {
      state.workflowRelays = state.workflowRelays.map((wfr) => {
        if (wfr.workflowRelayId === relayId) {
          return { ...wfr, [name]: value };
        } else {
          return wfr;
        }
      });
    },

    removeWorkflowRelay: (state, { payload: { stepId } }) => {
      state.workflowRelays = state.workflowRelays.filter(
        (wfr) => wfr.workflowStepId !== stepId
      );
    },
  },
});
export const {
  setWorkflowToInitial,
  changeWorkflowValue,
  updateTotalWorkflow,
  changeNodesEdgesAndViewport,

  // WORKFLOW STEP
  addWorkflowStep,
  updateSelectedStep,
  changeWorkflowStepValue,
  changeNextAndPreviousStep,
  removeWorkflowStep,

  // LAUNCH ELEMENT
  addLaunchElement,
  changeLaunchElementValue,
  removeLaunchElement,

  // RECORD-VIEW
  addRecordView,
  changeRecordViewValue,
  removeRecordView,

  // RECORD-VIEW-FIELDS
  addRecordViewField,
  changeAllRecordViewFields,
  changeRecordViewFieldValue,
  removeRecordViewFieldsByRecordViewID,
  removeRecordViewField,

  // RECORD-VIEW-FUNCTIONS
  changeAllRecordViewFunctions,
  removeFunctionsByRecordViewID,

  // VIEW HEADER
  addViewHeader,
  changeViewHeaderValue,
  removeViewHeader,

  // VIEW HEADER-ROW
  addViewHeaderRow,
  changeViewHeaderRowValue,
  removeViewHeaderRow,
  removeRowsByHeaderID,

  // VIEW HEADER-COLUMN
  addViewHeaderColumn,
  changeViewHeaderColumnValue,
  removeViewHeaderColumn,
  removeColumnsByRowID,

  // SCANNER DIALOG
  addScannerDialog,
  changeScannerDialogValue,
  removeScannerDialog,

  //MODAL DIALOG
  addModalDialog,
  changeModalDialogValue,
  removeModalDialog,
  changeNextStepOnConfirm,
  changeNextStepOnCancel,

  //WORKFLOW RELAY
  addWorkdlowRelay,
  changeWorkflowRelayValue,
  removeWorkflowRelay,

  //LIST-VIEW
  addListView,
  changeListViewValue,
  removeListView,

  //LIST-VIEW-ELEMENT
  addListViewElement,
  changeListViewElementValue,
  removeListViewElement,

  //LIST-VIEW-ELEMENT-ROW
  addListViewElementRow,
  changeListViewElementRowValue,
  removeListViewElementRowByElementId,
  removeListViewElementRowByRowId,

  //LIST-VIEW-DEFAULT-FILTER
  addListViewDefaultFilter,
  changeListViewDefaultFilterValue,
  removeListViewDefaultFilter,
  removeDefaultFilterByListViewID,

  //LIST-VIEW-FILTER-DEFINITION
  addListViewFilterDefinition,
  changeListViewFilterDefinitionValue,
  removeListViewFilterDefinition,
  removeFilterDefinitionByListViewID,
} = workflowSlice.actions;
export default workflowSlice.reducer;
