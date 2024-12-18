import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";
import CustomSelect from "../common-form-elements/CustomSelect";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import { scannerDialogActions } from "@/helpers/Enums";

const ScannerDialogFormBase = ({
  scannerDialog,
  viewId,
  entitiesForAutoSelect,
  children,
}) => {
  const [scannerDialogValues, setScannerDialogValues] = useState(scannerDialog);

  const { updateScannerDialogValue } = useWorkflowForms();

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

  useEffect(() => {
    setScannerDialogValues(scannerDialogValues);
  }, [viewId]);

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
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
              preferences={{ key: "id", caption: "name" }}
              options={[
                { id: "1", name: "targetFiedId" },
                { id: "2", name: "targetFiedId_2" },
              ]}
            />

            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={scannerDialogValues?.inputDataSourceId}
              label="Workflow für Manuelle Eingabe"
              name="inputDataSourceId"
              preferences={{ key: "id", caption: "caption" }}
              options={scannerDialogActions}
            />
            <CustomSelect
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={scannerDialogValues?.filterField}
              label="Filter Feld"
              name="filterField"
              preferences={{ key: "id", caption: "caption" }}
              options={scannerDialogActions}
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
