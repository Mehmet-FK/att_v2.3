import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import { Button, TextField } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const ValidationSection = ({ fieldID }) => {
  const { fieldValidations } = useSelector((state) => state.entity);

  const validation = useMemo(() =>
    fieldValidations.find((v) => v.fieldId === fieldID)
  );

  const { createFieldValidation } = useEntityForm();

  const addValidation = () => {
    createFieldValidation(fieldID);
  };

  return (
    <div>
      <Button variant="contained" onClick={addValidation} disabled={validation}>
        Validierungsregel
      </Button>
      {validation && (
        <TextField
          multiline
          rows={5}
          value={JSON.stringify(validation, null, 2) || ""}
          fullWidth
        />
      )}
    </div>
  );
};

export default ValidationSection;
