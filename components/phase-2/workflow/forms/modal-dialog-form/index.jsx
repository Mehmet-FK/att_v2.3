import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../common-form-elements/CustomSelect";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import { TextField } from "@mui/material";

const ModalDialogForm = ({ stepID, workflowStepValues }) => {
  const modalDialogs = useSelector((state) => state.workflow?.modalDialogs);
  const entityId = useSelector((state) => state.workflow.entityId);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const modalDialog = modalDialogs.find((md) => md.workflowStepId === stepID);
  const viewId = useMemo(() => modalDialog?.modalDialogId, [stepID]);

  const [modalDialogValues, setModalDialogValues] = useState({
    ...modalDialog,
    name: workflowStepValues?.name,
  });

  const { updateModalDialogValue, updateWorkflowStepValue } =
    useWorkflowForms();

  const prepareEntityFieldsForAutoSelect = () => {
    const entity = entities?.find((e) => e.id === parseInt(entityId));
    if (!entity) return [];

    return entity.fields.map((f) => ({
      id: f.id,
      caption: f.dataSourceColumn,
    }));
  };

  const entityFieldsForAutoSelect = useMemo(
    () => prepareEntityFieldsForAutoSelect(),
    [entityId, entities]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModalDialogValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    updateModalDialogValue(name, inputValue, viewId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;

    updateWorkflowStepValue(name, value, stepID);
  };

  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowStepBlur}
            value={modalDialogValues?.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={modalDialogValues?.caption || ""}
            variant="outlined"
            size="medium"
            label="Caption"
            name="caption"
            placeholder="z.B Ablehnen"
            fullWidth
          />{" "}
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={modalDialogValues?.userText || ""}
            variant="outlined"
            size="medium"
            label="Benutzer Informationstext"
            name="userText"
            placeholder="Möchten Sie..."
            fullWidth
          />
        </div>
        <div className={css.flex_row}>
          <CustomSelect
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={modalDialogValues?.fieldId || 0}
            label="Feld"
            name="fieldId"
            preferences={{ key: "id", caption: "caption" }}
            options={entityFieldsForAutoSelect || []}
          />

          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={modalDialogValues?.newValue || ""}
            variant="outlined"
            size="medium"
            label="Neuer Wert"
            name="newValue"
            fullWidth
          />
          <div style={{ width: "100%" }} />
        </div>
        <div className={css.flex_row}>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={modalDialogValues?.okButton || ""}
            variant="outlined"
            size="medium"
            label="Button fürs Bestätigen"
            name="okButton"
            placeholder="z.B Ja"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={modalDialogValues?.cancelButton || ""}
            variant="outlined"
            size="medium"
            label="Button fürs Ablehnen"
            name="cancelButton"
            placeholder="z.B Nein"
            fullWidth
          />
          <div style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default ModalDialogForm;
