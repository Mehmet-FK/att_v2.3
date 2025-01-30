import css from "@/styles/entity-styles/entities.module.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import FieldGroup from "@/components/phase-2/entities/FieldGroup";
import { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import Accordion from "@/components/ui-components/Accordion";
import ConfirmModal from "@/components/ui-components/ConfirmModal";

const FieldsAccordion = () => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

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
    <>
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />

      <Accordion
        accordionProps={{
          defaultExpanded: true,
        }}
        header={"FELDER"}
      >
        {entityFields?.map((field) => (
          <FieldGroup
            key={field.fieldId}
            field={field}
            setConfirmModalValues={setConfirmModalValues}
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
    </>
  );
};

export default FieldsAccordion;
