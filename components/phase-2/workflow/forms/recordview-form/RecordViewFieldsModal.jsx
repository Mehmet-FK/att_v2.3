import { Card, CardContent, Modal } from "@mui/material";
import css from "@/styles/workflow-forms/recordview-fields.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";

const DraggableRecordViewField = ({ field, entityFields }) => {
  const [fieldFormValues, setFieldFormValues] = useState(field);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <AutoCompleteSelect
          mainProps={{
            handleChange: () => console.log("change"),
            handleBlur: () => console.log("blur"),
            preferences: { key: "id", caption: "caption" },
            options: entityFields,
            name: "fieldId",
            value: fieldFormValues?.fieldId || "",
            label: "Field",
          }}
          helperProps={{
            fullWidth: true,
            size: "small",
            //   className: css.form_control,
          }}
        />
      </div>
    </div>
  );
};

const RecordViewFieldsModal = ({ open, setOpen, entityFields }) => {
  const { recordViewFields } = useSelector((state) => state.workflow);
  const [fields, setFields] = useState([...recordViewFields]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className={css.card}>
        <CardContent className={css.content}>
          {fields?.map((rvf) => (
            <DraggableRecordViewField field={rvf} entityFields={entityFields} />
          ))}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default RecordViewFieldsModal;
