import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import CustomSelect from "@/components/ui-components/CustomSelect";
import ElementBadge from "@/components/ui-components/ElementBadge";
import { Card, CardContent, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import ConditionOperatorOptions from "@/workflow-manager/models/modal-dialog/ConditionOperatorOptions";

const ConditionalTextForm = ({
  textOptionValues,
  handleChange,
  handleBlur,
  openConfirmModalToDelete,
  entityFields,
}) => {
  const [conditionOperators, setConditionOperators] = useState([]);

  const textOptionID = textOptionValues?.modalDialogUserTextId;

  const prepareOperatorOptions = (fieldID) => {
    const selected = entityFields?.find((f) => f.id === fieldID);
    const operatorOptions = new ConditionOperatorOptions(selected?.type);
    setConditionOperators(operatorOptions.get());
  };

  if (conditionOperators.length < 1) {
    prepareOperatorOptions(textOptionValues?.conditionFieldId);
  }

  const handleChangeConditionField = (e) => {
    const selectedFieldId = e.target.value;
    prepareOperatorOptions(selectedFieldId);
    handleChange(e, textOptionID);
  };

  return (
    <div style={{ width: "100%" }}>
      <ElementBadge
        handleClickOnBadge={() => openConfirmModalToDelete(textOptionID)}
      >
        <Card sx={{ width: "100%", backgroundColor: "inherit" }}>
          <CardContent>
            <div className={css.flex_column}>
              <div className={css.flex_row}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  WHEN
                </span>
                <CustomSelect
                  handleChange={handleChangeConditionField}
                  handleBlur={handleBlur}
                  value={textOptionValues?.conditionFieldId}
                  label="Bedingungsfeld"
                  name="conditionFieldId"
                  size="small"
                  preferences={{ key: "id", caption: "caption" }}
                  options={entityFields}
                />
                <CustomSelect
                  handleChange={(e) => handleChange(e, textOptionID)}
                  handleBlur={handleBlur}
                  value={textOptionValues?.conditionOperator || ""}
                  preferences={{ key: "name", caption: "caption" }}
                  label="Operator"
                  name="conditionOperator"
                  size="small"
                  options={conditionOperators}
                />
                <TextField
                  onChange={(e) => handleChange(e, textOptionID)}
                  onBlur={handleBlur}
                  value={textOptionValues?.conditionValue || ""}
                  variant="outlined"
                  size="small"
                  label="Wert"
                  name="conditionValue"
                  fullWidth
                />
              </div>
              <Divider />
              <div className={css.flex_row}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  DANN
                </span>

                <TextField
                  onChange={(e) => handleChange(e, textOptionID)}
                  onBlur={handleBlur}
                  value={textOptionValues?.userText || ""}
                  variant="outlined"
                  label="Informationstext"
                  name="userText"
                  size="small"
                  fullWidth
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </ElementBadge>
    </div>
  );
};

export default ConditionalTextForm;
