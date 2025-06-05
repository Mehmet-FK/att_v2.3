import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import CustomSelect from "@/components/ui-components/CustomSelect";
import ElementBadge from "@/components/ui-components/ElementBadge";
import { Card, CardContent, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";

const ConditionalFieldForm = ({
  fieldFormValues,
  handleChange,
  handleBlur,
  openConfirmModalToDelete,
  entityFields,
}) => {
  const fieldUpdateID = fieldFormValues?.modalDialogFieldId;
  console.log(fieldUpdateID);
  return (
    <div style={{ width: "100%" }}>
      <ElementBadge
        handleClickOnBadge={() => openConfirmModalToDelete(fieldUpdateID)}
      >
        <Card sx={{ width: "100%", backgroundColor: "inherit" }}>
          <CardContent>
            <div className={css.flex_column}>
              <div className={css.flex_row}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  WHEN
                </span>
                <CustomSelect
                  handleChange={(e) => handleChange(e, fieldUpdateID)}
                  handleBlur={handleBlur}
                  value={fieldFormValues?.conditionFieldId}
                  label="Bedingungsfeld"
                  name="conditionFieldId"
                  size="small"
                  preferences={{ key: "id", caption: "caption" }}
                  options={entityFields}
                />
                <CustomSelect
                  handleChange={(e) => handleChange(e, fieldUpdateID)}
                  handleBlur={handleBlur}
                  value={fieldFormValues?.conditionOperator || "IS_EMPTY"}
                  label="Operator"
                  name="conditionOperator"
                  size="small"
                  //   preferences={{ key: "id", caption: "caption" }}
                  options={[
                    "IS_EQUAL",
                    "IS_EMPTY",
                    "IS_NULL",
                    "IS_GREATER_THAN",
                  ]}
                />
                <TextField
                  onChange={(e) => handleChange(e, fieldUpdateID)}
                  onBlur={handleBlur}
                  value={fieldFormValues?.conditionValue || ""}
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
                <CustomSelect
                  handleChange={(e) => handleChange(e, fieldUpdateID)}
                  handleBlur={handleBlur}
                  value={fieldFormValues?.updateFieldId}
                  label="Feld"
                  name="updateFieldId"
                  size="small"
                  preferences={{ key: "id", caption: "caption" }}
                  options={entityFields}
                />
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    fontSize: "larger",
                    fontWeight: "bolder",
                  }}
                >
                  :
                </span>
                <TextField
                  onChange={(e) => handleChange(e, fieldUpdateID)}
                  onBlur={handleBlur}
                  value={fieldFormValues?.fieldValue || ""}
                  variant="outlined"
                  label="Neuer Wert"
                  name="fieldValue"
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

export default ConditionalFieldForm;
