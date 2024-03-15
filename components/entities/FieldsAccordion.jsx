import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "../Accordion";
import FieldGroup from "./FieldGroup";
import { toastWarnNotify } from "@/helpers/ToastNotify";

const FieldsAccordion = ({ entity, fields, setFields }) => {
  const removeField = (id) => {
    const filtered = fields.filter((f) => f.id !== id);
    setFields(filtered);
  };

  // checks if dataSource (View) Value is empty. if empty does not add new field
  // because fieldGroups need dataSource value to make API Call for View columns
  //
  const addNewField = () => {
    if (!entity?.dataSource) {
      // if no dataSource selected yet
      toastWarnNotify("Zuerst das DataSource festlegen!");
      return;
    }

    const groupID = `id-${Math.random().toString(36).substr(2, 10)}`; // Id to determine current group in fields array
    const inx = fields.length;
    setFields([
      ...fields,
      {
        index: inx,
        id: groupID,
      },
    ]);
  };
  return (
    <Accordion expandDefault header={"FELDER"}>
      {fields?.map((field, index) => (
        <FieldGroup
          key={index}
          field={field}
          view={entity?.dataSource}
          setFields={setFields}
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
