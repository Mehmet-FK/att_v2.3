import { Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import ViewHeaderForm from "../header-form";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import RecordViewFieldsModal from "./RecordViewFieldsModal";

const RecordViewForm = ({
  stepID,
  entitiesForAutoSelect,
  workflowStepValues,
}) => {
  const { recordViews } = useSelector((state) => state.workflow);
  const { entities } = useSelector((state) => state.attensam.data);

  const recordView = useMemo(
    () => recordViews.find((rv) => rv.workflowStepId === stepID),
    [stepID]
  );
  const viewId = recordView?.recordViewId;

  const [recordViewValues, setRecordViewValues] = useState(recordView);
  const [openRecordFieldsModal, setOpenRecordFieldsModal] = useState(false);

  const { updateRecordViewValue, updateWorkflowStepValue } = useWorkflowForms();

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

  const prepareEntityFields = () => {
    const selectedEntity = entities?.find(
      (entity) => entity.id == recordView?.entityId
    );
    if (!selectedEntity) return [];

    return selectedEntity.fields.map((field) => ({
      id: field.id,
      caption: field.name,
    }));
  };

  const entityFields = useMemo(
    () => prepareEntityFields(),
    [recordView?.entityId, entities]
  );

  useEffect(() => {
    const recordViewFormValue = {
      ...recordView,
      name: workflowStepValues?.name,
    };
    setRecordViewValues(recordViewFormValue);
  }, [stepID]);

  return (
    <>
      <RecordViewFieldsModal
        open={openRecordFieldsModal}
        setOpen={setOpenRecordFieldsModal}
        entityFields={entityFields}
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
                preferences: { key: "id", caption: "caption" },
                options: entitiesForAutoSelect,
                name: "entityId",
                value: recordViewValues?.entityId || "",
                label: "Entität",
              }}
              helperProps={{
                className: css.form_control,
              }}
            />

            <div className={css.flex_row} style={{ width: "100%" }}>
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

              <Button
                variant="contained"
                onClick={() => setOpenRecordFieldsModal(true)}
              >
                {" "}
                open record-view-fields
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={css.header_form_wrapper}>
        <ViewHeaderForm viewId={viewId} defaultExpanded={true} />
      </div>
    </>
  );
};

export default RecordViewForm;
