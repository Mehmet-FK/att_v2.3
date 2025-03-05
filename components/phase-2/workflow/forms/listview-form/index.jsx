import { TextField } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import ViewHeaderForm from "../header-form";
import ListViewElement from "./ListViewElement";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import ListViewFilterDefinitions from "./ListViewFilterDefinitions";
import { useAutoCompleteEntities } from "@/context/AutoCompleteEntityContext";
import ListViewDefaultFilter from "./ListViewDefaultFilter";
import { viewTypeConstants, workflowStepTypeIds } from "@/helpers/Constants";

const ListViewForm = ({ stepID, workflowStepValues }) => {
  const listViews = useSelector((state) => state.workflow?.listViews);
  const listViewElements = useSelector(
    (state) => state.workflow?.listViewElements
  );

  const entities = useSelector((state) => state.attensam.data?.entities);
  const { autoCompleteEntities } = useAutoCompleteEntities();

  const listView = useMemo(
    () => listViews.find((lv) => lv.workflowStepId === stepID),
    [stepID]
  );
  const [listViewValues, setListViewValues] = useState({
    ...listView,
    name: workflowStepValues?.name,
  });

  const viewId = useMemo(() => listView?.listViewId, [stepID]);
  const selectedEntityId = useMemo(
    () => listViewValues?.entityId,
    [listViewValues?.entityId]
  );

  const listViewElement = useMemo(
    () =>
      listViewElements.find(
        (lve) => lve.listViewElementId === listView?.listViewElementId
      ),
    [stepID]
  );

  const { updateListViewValue, updateWorkflowStepValue, prepareEntityFields } =
    useWorkflowForms();

  const entityFields = useMemo(
    () => prepareEntityFields(entities, listViewValues?.entityId),
    [entities, listViewValues?.entityId]
  );

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setListViewValues({
      ...listViewValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    updateListViewValue(name, inputValue, viewId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    updateWorkflowStepValue(name, value, stepID);
  };

  // useEffect(() => {
  //   const listViewFormValue = {
  //     ...listView,
  //     name: workflowStepValues?.name,
  //   };

  //   setListViewValues(listViewFormValue);
  // }, [stepID]);

  return (
    <div className={css.flex_column}>
      <div className={css.form_container}>
        <div className={css.flex_row}>
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowStepBlur}
            value={listViewValues?.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />

          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: handleBlur,
              preferences: { key: "id", caption: "caption" },
              options: autoCompleteEntities,
              name: "entityId",
              value: listViewValues?.entityId,
              label: "Entität",
              defaultValue: null,
            }}
            helperProps={{
              className: css.form_control,
            }}
          />
          <div style={{ display: "flex", width: "100%" }}>
            <CheckBox
              sx={{
                width: "100%",
              }}
              name="hasLookup"
              checked={listViewValues?.hasLookup}
              handleChange={handleChange}
              handleBlur={handleBlur}
              label={"hasLookup"}
            />
            <CheckBox
              sx={{
                width: "100%",
              }}
              name="onlyOnline"
              checked={listViewValues?.onlyOnline}
              handleChange={handleChange}
              handleBlur={handleBlur}
              label={"onlyOnline"}
            />
            <CheckBox
              sx={{
                width: "100%",
              }}
              name="mergeData"
              checked={listViewValues?.mergeData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              label={"mergeData"}
            />
          </div>
        </div>
      </div>
      <div className={css.header_form_wrapper}>
        <ViewHeaderForm
          viewId={viewId}
          viewType={workflowStepTypeIds.LISTVIEW}
          entityFields={entityFields}
          defaultExpanded={false}
        />
      </div>
      <div className={css.flex_row} style={{ paddingInline: "10px" }}>
        <div className={css.section_container}>
          <ListViewElement
            element={listViewElement}
            entityFields={entityFields}
            listViewId={viewId}
          />
        </div>
        <div className={css.section_container}>
          <ListViewFilterDefinitions
            listViewId={viewId}
            selectedEntityId={selectedEntityId}
            entityFields={entityFields}
          />
        </div>
      </div>
      <div className={css.flex_row} style={{ paddingInline: "10px" }}>
        <div className={css.section_container}>
          <ListViewDefaultFilter
            entityFields={entityFields}
            listViewId={viewId}
          />
        </div>
        <div className={css.section_container}></div>
      </div>
    </div>
  );
};

export default ListViewForm;
