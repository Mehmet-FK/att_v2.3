import css from "@/styles/entities.module.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@/components/ui-components/Accordion";
import FieldGroup from "@/components/phase-2/entities/FieldGroup";
import { toastWarnNotify } from "@/helpers/ToastNotify";
import { useEffect } from "react";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";

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

const FieldsAccordion = ({ entitiesForAutoSelect }) => {
  const { dataSource, entityFields, fieldTypes } = useSelector(
    (state) => state.entity
  );

  const { getViewColumnsCall, getFieldTypes } = useAttensamCalls();

  const { createEntityField } = useEntityForm();

  const addNewField = () => {
    createEntityField();
  };

  useEffect(() => {
    if (dataSource) {
      getViewColumnsCall(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (!fieldTypes) {
      getFieldTypes();
    }
  }, []);

  return (
    <Accordion expandDefault header={"FELDER"}>
      {entityFields?.map((field) => (
        <FieldGroup
          key={field.fieldId}
          field={field}
          entitiesForAutoSelect={entitiesForAutoSelect}
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
