import { Box, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";
import CustomSelect from "../common-form-elements/CustomSelect";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import { scannerDialogActions } from "@/helpers/Enums";
import { useSelector } from "react-redux";
const ScannerDialogFormBase = ({
  scannerDialog,
  viewId,
  scannerDialogValues,
  setScannerDialogValues,
  entityFields,
  entitiesForAutoSelect,
  workflowsForAutoCompleteSelect,
  workflowStepValues,
  children,
}) => {
  const { updateScannerDialogValue, updateWorkflowStepValue } =
    useWorkflowForms();

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
    console.log(viewId);
    updateScannerDialogValue(name, inputValue, viewId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    const stepID = workflowStepValues?.workflowStepId;
    updateWorkflowStepValue(name, value, stepID);
    handleBlur(e);
  };

  useEffect(() => {
    const scannerDialogFormValue = {
      ...scannerDialog,
      name: workflowStepValues?.name,
    };

    setScannerDialogValues(scannerDialogFormValue);
  }, [viewId]);
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
                options: entitiesForAutoSelect,
                name: "entityId",
                value: scannerDialogValues?.entityId || "",
                label: "Entität",
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
          </div>{" "}
          <div className={css.flex_row}>
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={scannerDialogValues?.targetFiedId}
              label="Target Field"
              name="targetFiedId"
              preferences={{ key: "id", caption: "caption" }}
              options={entityFields}
            />

            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: { key: "id", caption: "caption", image: "icon" },
                options: workflowsForAutoCompleteSelect || [],
                name: "inputDataSourceId",
                value: scannerDialogValues?.inputDataSourceId || "",
                label: "Workflow für Manuelle Eingabe",
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
