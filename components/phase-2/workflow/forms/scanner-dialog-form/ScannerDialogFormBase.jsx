import { TextField } from "@mui/material";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";
import CustomSelect from "../common-form-elements/CustomSelect";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import { scannerDialogActions } from "@/helpers/Enums";
import { useAutoCompleteEntities } from "@/context/AutoCompleteEntityContext";
import { useAutoCompleteWorkflows } from "@/context/AutoCompleteWorkflowContext";
const ScannerDialogFormBase = ({
  viewId,
  scannerDialogValues,
  setScannerDialogValues,
  entityFields,
  targetFieldOptions,
  children,
}) => {
  const { updateScannerDialogValue, updateWorkflowStepValue } =
    useWorkflowForms();

  const { autoCompleteEntities } = useAutoCompleteEntities();
  const { autoCompleteWorkflows } = useAutoCompleteWorkflows();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setScannerDialogValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    updateScannerDialogValue(name, inputValue, viewId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    const stepID = scannerDialogValues?.workflowStepId;
    console.log({ name, value, stepID });
    updateWorkflowStepValue(name, value, stepID);
    handleBlur(e);
  };

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleWorkflowStepBlur}
              value={scannerDialogValues?.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={scannerDialogValues?.description || ""}
              variant="outlined"
              size="medium"
              label="Beschreibung"
              name="description"
              fullWidth
            />
            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: { key: "id", caption: "caption" },
                options: autoCompleteEntities,
                name: "entityId",
                value: scannerDialogValues?.entityId,
                label: "Entität",
                defaultValue: null,
              }}
              helperProps={{
                className: css.form_control,
              }}
            />
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={scannerDialogValues?.scannerAction}
              label="Scanner Aktion"
              name="scannerAction"
              preferences={{ key: "id", caption: "caption" }}
              options={scannerDialogActions}
            />
          </div>
          <div className={css.flex_row}>
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={scannerDialogValues?.targetFieldId || null}
              label="Target Field"
              name="targetFieldId"
              defaultValue={null}
              preferences={{ key: "id", caption: "caption" }}
              options={targetFieldOptions}
              FormControlProps={{
                disabled: !targetFieldOptions?.length,
              }}
            />
            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: { key: "id", caption: "caption", image: "icon" },
                options: autoCompleteWorkflows || [],
                name: "inputDataSourceId",
                value: scannerDialogValues?.inputDataSourceId,
                label: "Workflow für Manuelle Eingabe",
                defaultValue: null,
              }}
              helperProps={{
                className: css.form_control,
              }}
            />

            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={scannerDialogValues?.filterField}
              label="Filter Feld"
              name="filterField"
              preferences={{ key: "caption", caption: "caption" }}
              options={entityFields}
            />

            <CheckBox
              handleChange={handleChange}
              handleBlur={handleBlur}
              checked={scannerDialogValues?.allowManualInput}
              label="allowManualInput"
              name="allowManualInput"
              sx={{
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
      <div className={css.header_form_wrapper}>{children}</div>
    </>
  );
};

export default ScannerDialogFormBase;
