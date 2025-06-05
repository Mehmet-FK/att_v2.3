import { Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import ViewHeaderForm from "../header";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import { useAutoCompleteEntities } from "@/context/AutoCompleteEntityContext";
import { viewTypeConstants, workflowStepTypeIds } from "@/helpers/Constants";
import CheckBox from "@/components/ui-components/CheckBox";
import AutoCompleteSelect from "@/components/ui-components/AutoCompleteSelect";
import RecordViewFieldsModal from "../recordview-fields/RecordViewFieldsModal";
import RecordViewFunctionsModal from "../recordview-functions/RecordViewFunctionsModal";

const RecordViewForm = ({ stepID, workflowStepValues }) => {
  const recordViews = useSelector((state) => state.workflow.recordViews);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const recordView = useMemo(
    () => recordViews.find((rv) => rv.workflowStepId === stepID),
    [stepID]
  );
  const viewId = useMemo(() => recordView?.recordViewId, [recordView]);

  const [recordViewValues, setRecordViewValues] = useState({
    ...recordView,
    name: workflowStepValues?.name,
  });
  const [openRecordFieldsModal, setOpenRecordFieldsModal] = useState(false);
  const [openRecordFunctionsModal, setOpenRecordFunctionsModal] =
    useState(false);

  const {
    updateRecordViewValue,
    updateWorkflowStepValue,
    prepareEntityFields,
  } = useWorkflowForms();

  const { autoCompleteEntities } = useAutoCompleteEntities();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setRecordViewValues((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    updateRecordViewValue(name, inputValue, viewId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    updateWorkflowStepValue(name, value, stepID);
  };

  const entityFields = useMemo(
    () => prepareEntityFields(entities, recordViewValues?.entityId),
    [recordViewValues?.entityId, entities]
  );

  return (
    <>
      <RecordViewFieldsModal
        key={viewId + "-record-field"}
        recordViewId={viewId}
        open={openRecordFieldsModal}
        setOpen={setOpenRecordFieldsModal}
        entityFields={entityFields}
      />
      <RecordViewFunctionsModal
        key={viewId + "-record-function"}
        recordViewId={viewId}
        open={openRecordFunctionsModal}
        setOpen={setOpenRecordFunctionsModal}
      />

      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleWorkflowStepBlur}
              value={recordViewValues?.name || ""}
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
                preferences: {
                  key: "id",
                  caption: "caption",
                  filterKeys: ["id", "caption", "name"],
                },
                options: autoCompleteEntities,
                name: "entityId",
                value: recordViewValues?.entityId,
                label: "Entität",
              }}
              helperProps={{
                className: css.form_control,
              }}
            />

            <div className={css.flex_row}>
              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues?.isEditable}
                label="isEditable"
                name="isEditable"
                sx={{
                  width: "100%",
                }}
              />

              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues?.showMenue}
                label="showMenue"
                name="showMenue"
                sx={{
                  width: "100%",
                }}
              />

              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues?.createNewDataset}
                label="createNewDataset"
                name="createNewDataset"
                sx={{
                  width: "100%",
                }}
              />
              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues?.cacheOnSubmit}
                label="cacheOnSubmit"
                name="cacheOnSubmit"
                sx={{
                  width: "100%",
                }}
              />

              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenRecordFieldsModal(true)}
                fullWidth
              >
                RECORD FELDER
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenRecordFunctionsModal(true)}
                fullWidth
              >
                FUNKTIONEN
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={css.flex_column}>
        <div className={css.header_form_wrapper}>
          <ViewHeaderForm
            viewId={viewId}
            viewType={workflowStepTypeIds.RECORDVIEW}
            entityFields={entityFields}
            defaultExpanded={false}
          />
        </div>
      </div>
    </>
  );
};

export default RecordViewForm;
