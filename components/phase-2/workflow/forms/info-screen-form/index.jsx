import css from "@/styles/workflow-forms-styles/list-view-form.module.css";

import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import { useMemo, useState } from "react";
import ViewHeaderForm from "../header-form";
import { workflowStepTypeIds } from "@/helpers/Constants";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import CustomSelect from "../common-form-elements/CustomSelect";

const InfoScreenForm = ({ stepID, workflowStepValues }) => {
  const infoScreens = useSelector((state) => state.workflow?.infoScreens);
  const entityId = useSelector((state) => state.workflow.entityId);
  const workflowSteps = useSelector((state) => state.workflow.workflowSteps);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const infoScreen = useMemo(
    () => infoScreens.find((screen) => screen.workflowStepId === stepID),
    [stepID]
  );

  const viewId = infoScreen?.infoScreenId;

  const [infoScreenValues, setInfoScreenValues] = useState({
    ...infoScreen,
    name: workflowStepValues?.name,
  });

  const {
    updateInfoScreenValue,
    updateWorkflowStepValue,
    prepareEntityFields,
  } = useWorkflowForms();

  const entityFields = useMemo(
    () => prepareEntityFields(entities, entityId),
    [entities, entityId]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setInfoScreenValues((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    updateInfoScreenValue(name, inputValue, viewId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    updateWorkflowStepValue(name, value, stepID);
  };

  const submitCacheOptions = useMemo(
    () => [
      { id: "timecapture", caption: "Zeiterfassung-Kommen" },
      ...workflowSteps.map((wfs) => ({
        id: wfs.workflowStepId,
        caption: `(${wfs.workflowStepId}) - ${wfs.name}`,
      })),
    ],
    [workflowSteps]
  );

  return (
    <>
      <div className={css.flex_column} style={{ paddingInline: "10px" }}>
        <div className={css.flex_row}>
          <div className={css.flex_column}>
            <div className={css.flex_row}>
              <TextField
                onChange={handleChange}
                onBlur={handleWorkflowStepBlur}
                value={infoScreenValues?.name || ""}
                variant="outlined"
                size="medium"
                label="Name"
                name="name"
                fullWidth
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={infoScreenValues?.title || ""}
                variant="outlined"
                size="medium"
                label="Title"
                name="title"
                fullWidth
              />
            </div>
            <div className={css.flex_row}>
              <div className={css.flex_row}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={infoScreenValues?.confirmButton || ""}
                  variant="outlined"
                  size="medium"
                  label="Button fürs Bestätigen"
                  name="confirmButton"
                  placeholder="z.B Ja"
                  fullWidth
                />
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={infoScreenValues?.cancelButton || ""}
                  variant="outlined"
                  size="medium"
                  label="Button fürs Ablehnen"
                  name="cancelButton"
                  placeholder="z.B Nein"
                  fullWidth
                />
              </div>

              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={infoScreenValues?.submitCache}
                label="submitCache"
                name="submitCache"
                preferences={{
                  key: "id",
                  caption: "caption",
                }}
                options={submitCacheOptions}
              />
            </div>
          </div>

          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={infoScreenValues?.infoText || ""}
            variant="outlined"
            size="medium"
            label="Benutzer Informationstext"
            name="infoText"
            placeholder="Möchten Sie..."
            multiline
            rows={5}
            fullWidth
          />
        </div>
      </div>
      <div className={css.header_form_wrapper}>
        <ViewHeaderForm
          viewId={viewId}
          viewType={workflowStepTypeIds.INFO_SCREEN}
          entityFields={entityFields}
          defaultExpanded={false}
        />
      </div>
    </>
  );
};

export default InfoScreenForm;
