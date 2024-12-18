import css from "@/styles/workflow-forms/list-view-form.module.css";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../common-form-elements/CustomSelect";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { TextField } from "@mui/material";

const ModalDialogForm = ({ stepID }) => {
  const { modalDialogs } = useSelector((state) => state.workflow);

  const viewId = useMemo(() => stepID + "-modal", [stepID]);
  const modalDialog = modalDialogs.find((md) => md.modalDialogId === viewId);

  const [modalDialogValues, setModalDialogValues] = useState(modalDialog);

  const { updateModalDialogValue } = useWorkflowForms();

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

  useEffect(() => {
    setModalDialogValues(modalDialog);
  }, [stepID]);

  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
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
          />
          <CustomSelect
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={modalDialogValues?.fieldId || ""}
            label="Feld"
            name="fieldId"
            preferences={{ key: "id", caption: "name" }}
            options={[
              { id: "1", name: "fieldId" },
              { id: "2", name: "fieldId_2" },
            ]}
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
          />{" "}
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
      </div>
    </div>
  );
};

export default ModalDialogForm;
