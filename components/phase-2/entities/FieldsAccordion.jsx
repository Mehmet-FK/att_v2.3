import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@/components/ui-components/Accordion";
import FieldGroup from "@/components/phase-2/entities/FieldGroup";
import { toastWarnNotify } from "@/helpers/ToastNotify";

const fieldTemplate = {
  id: null,
  name: "",
  caption: "",
  type: 0,
  dataSourceColumn: "",
  linkedEntityId: null,
  showMobile: false,
  validationId: null,
  isReadOnly: false,
  maxLength: null,
  decimalPlaces: null,
  showByDefault: false,
  groupName: "Allgemein",
};

const FieldsAccordion = ({
  entityForm,
  setEntityForm,
  entitiesForAutoSelect,
}) => {
  const fields = entityForm.fields;

  const removeField = (fieldId) => {
    const filteredFields = fields.filter((field) => field.id !== fieldId);
    setEntityForm({ ...entityForm, fields: filteredFields });
  };

  const addNewField = () => {
    const randomId = Math.ceil(new Date().getTime() * Math.random());
    if (!entityForm?.dataSource) {
      toastWarnNotify("Zuerst ein DataSource auswählen!");
      return;
    }
    fields.push({ ...fieldTemplate, id: randomId });
    setEntityForm({ ...entityForm, fields });
  };

  const handleBlur = (e, fieldId) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    const changedFields = fields.map((field) => {
      if (field.id === fieldId) {
        return { ...field, [name]: inputValue };
      } else {
        return field;
      }
    });
    setEntityForm({ ...entityForm, fields: changedFields });
  };

  return (
    <Accordion expandDefault header={"FELDER"}>
      {fields?.map((field) => (
        <FieldGroup
          key={field.id}
          field={field}
          view={entityForm?.dataSource}
          entitiesForAutoSelect={entitiesForAutoSelect}
          handleBlur={handleBlur}
          removeField={removeField}
        />
      ))}
      <Tooltip title="Neues Feld anlegen" placement="right" arrow>
        <Button
          variant="outlined"
          size="small"
          sx={{ alignSelf: "flex-end", fontSize: 20 }}
          onClick={addNewField}
        >
          +
        </Button>
      </Tooltip>
    </Accordion>
  );
};

export default FieldsAccordion;
