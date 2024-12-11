import useAttensamCalls from "@/hooks/useAttensamCalls";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import HeaderForm from "./header-form";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";

const permissionTypes = { User: "0", All: "1" };
const fieldTypes = {
  String: "0",
  LongText: "1",
  Integer: "2",
  Decimal: "3",
  Boolean: "4",
  DateTime: "5",
  Date: "6",
  Time: "7",
  Image: "8",
  File: "9",
  Enum: "10",
  Url: "11",
  Email: "12",
  PhoneNumber: "13",
};

const initialStepValues = {
  entityId: "",
  name: "",
  caption: "",
};

const initialHeaderValues = {
  caption: "",
  icon: "",
  gradientStart: "",
  gradientEnd: "",
  rows: [
    {
      id: 1,
    },
  ],
  columns: [
    { id: 1, rowId: 1 },
    { id: 2, rowId: 1 },
    { id: 3, rowId: 1 },
  ],
};

const initialFieldValues = {
  id: 1,
  caption: "",
  type: "",
  value: "",
  groupName: "",
  validation: {
    pattern: "",
    minDate: "",
    maxDate: "",
    regex: "",
    minValue: 0,
    maxValue: 250,
    isReadOnly: false,
    showByDefault: false,
    maxLength: 250,
    required: false,
  },
};

const Field = ({
  id,
  fieldValues,
  setFields,
  handleChangeField,
  handleChangeValidation,
  handleFieldsBlur,
}) => {
  const removeField = () => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <div
      className={css.flex_row}
      style={{
        border: "1px solid #955",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <span
        title="remove row"
        className={css.remove_field_btn}
        onClick={removeField}
      >
        ×
      </span>

      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            onChange={(e) => handleChangeField(e, id)}
            onBlur={handleFieldsBlur}
            value={fieldValues.caption || ""}
            variant="outlined"
            size="small"
            label="Caption"
            name="caption"
            fullWidth
          />

          <TextField
            onChange={(e) => handleChangeField(e, id)}
            onBlur={handleFieldsBlur}
            value={fieldValues.groupName || ""}
            variant="outlined"
            size="small"
            label="Group Name"
            name="groupName"
            fullWidth
          />
        </div>
        <div className={css.flex_row}>
          <FormControl className={css.form_control} size="small">
            <InputLabel id="fieldType">Type</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="fieldType"
              id="fieldType"
              value={fieldValues?.type || ""}
              label="Type"
              name="type"
              onChange={(e) => handleChangeField(e, id)}
              onBlur={handleFieldsBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {Object.keys(fieldTypes)?.map((key) => (
                <MenuItem key={key} value={fieldTypes[key]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={css.form_control} size="small">
            <InputLabel id="fieldValue">Value</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="fieldValue"
              id="fieldValue"
              value={fieldValues?.value || ""}
              label="Value"
              name="value"
              onChange={(e) => handleChangeField(e, id)}
              onBlur={handleFieldsBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {Object.keys(fieldTypes)?.map((key) => (
                <MenuItem key={key} value={fieldTypes[key]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div
          className={css.flex_column}
          style={{
            // border: "1px solid #559",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <p style={{ fontSize: "0.8rem" }}>Validation</p>

          <div className={css.flex_row}>
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.pattern || ""}
              variant="outlined"
              size="small"
              label="Pattern"
              name="pattern"
              fullWidth
            />
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.regex || ""}
              variant="outlined"
              size="small"
              label="Regex"
              name="regex"
              fullWidth
            />
          </div>
          <div className={css.flex_row}>
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.minDate || ""}
              variant="outlined"
              size="small"
              label="Min Date"
              name="minDate"
              fullWidth
            />
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.maxDate || ""}
              variant="outlined"
              size="small"
              label="Max Date"
              name="maxDate"
              fullWidth
            />
          </div>
          <div className={css.flex_row}>
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.minValue || ""}
              variant="outlined"
              type="Number"
              size="small"
              label="Min Value"
              name="minValue"
              fullWidth
            />
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.maxValue || ""}
              variant="outlined"
              type="Number"
              size="small"
              label="Max Value"
              name="maxValue"
              fullWidth
            />
          </div>
          <div className={css.flex_row}>
            <TextField
              onChange={(e) => handleChangeValidation(e, id)}
              onBlur={handleFieldsBlur}
              value={fieldValues.validation.maxLength || ""}
              variant="outlined"
              type="Number"
              size="small"
              label="Max Length"
              name="maxLength"
              fullWidth
            />
          </div>
          <div className={css.flex_row}>
            <FormControlLabel
              sx={{ width: "100%", marginLeft: "5px" }}
              control={
                <Checkbox
                  name="isReadOnly"
                  checked={fieldValues.validation.isReadOnly}
                  onChange={(e) => handleChangeValidation(e, id)}
                  onBlur={handleFieldsBlur}
                />
              }
              label={<span style={{ fontSize: "smaller" }}>isReadOnly</span>}
              labelPlacement="end"
            />
            <FormControlLabel
              sx={{ width: "100%" }}
              control={
                <Checkbox
                  name="showByDefault"
                  checked={fieldValues.validation.showByDefault}
                  onChange={(e) => handleChangeValidation(e, id)}
                  onBlur={handleFieldsBlur}
                />
              }
              label={<span style={{ fontSize: "smaller" }}>showByDefault</span>}
              labelPlacement="end"
            />
            <FormControlLabel
              sx={{ width: "100%" }}
              control={
                <Checkbox
                  name="required"
                  checked={fieldValues.validation.required}
                  onChange={(e) => handleChangeValidation(e, id)}
                  onBlur={handleFieldsBlur}
                />
              }
              label={<span style={{ fontSize: "smaller" }}>Required</span>}
              labelPlacement="end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RecordViewFields = ({ fields, setFields, handleFieldsBlur }) => {
  const addField = () => {
    const max = Math.max(...fields.map((f) => f.id), 0);
    setFields((prev) => [...prev, { ...initialFieldValues, id: max + 1 }]);
  };

  const handleChangeField = (e, id) => {
    const { value, name } = e.target;

    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              [name]: value,
            }
          : field
      )
    );
  };

  const handleChangeValidation = (e, id) => {
    const { value, name, type, checked } = e.target;

    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              validation: {
                ...field.validation,
                [name]: type === "checkbox" ? checked : value,
              },
            }
          : field
      )
    );
  };

  return (
    <div className={css.fields_container}>
      <Accordion>
        <AccordionSummary
          sx={{ fontSize: "smaller", paddingBlock: "0" }}
          expandIcon={<ExpandMoreIcon fontSize="small" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Fields
        </AccordionSummary>
        <AccordionDetails>
          <div className={css.flex_column}>
            {fields.map((field) => (
              <Field
                key={field.id}
                id={field.id}
                fieldValues={field}
                setFields={setFields}
                handleChangeField={handleChangeField}
                handleChangeValidation={handleChangeValidation}
                handleFieldsBlur={handleFieldsBlur}
              />
            ))}
            <button onClick={() => addField()}>add field</button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const RecordViewForm = ({ stepID }) => {
  // const { entityDefinitions } = useSelector((state) => state.attensam.data);
  const { user } = useSelector((state) => state.settings);
  const { workflowSteps } = useSelector((state) => state.workflow);

  const { getEntityDefinitionsCall } = useAttensamCalls();
  const { handleWFStepBlur } = useWorkflowForms();

  const [entityDefinitions, setEntityDefinitions] = useState([]);

  const [stepValues, setStepValues] = useState(initialStepValues);
  const [headerValues, setHeaderValues] = useState(initialHeaderValues);
  const [fields, setFields] = useState([initialFieldValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStepValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!user?.token) return;
    getEntityDefinitionsCall().then((res) => setEntityDefinitions(res));
  }, [user]);

  const handleStepBlur = (e) => {
    const { name, value } = e.target;
    handleWFStepBlur(name, value);
  };

  const handleHeaderBlur = () => {
    handleWFStepBlur("header", headerValues);
  };

  const handleFieldsBlur = () => {
    handleWFStepBlur("fields", fields);
  };

  /**
   * If stepID changes (if different record view)
   * set states to existing values
   *
   * else
   * set initial values
   */

  useEffect(() => {
    const step = workflowSteps.find((step) => step.id === stepID);

    setStepValues((prev) => ({
      ...prev,
      name: step?.name,
      entityId: step?.entityId,
      caption: step?.caption,
    }));

    setHeaderValues((prev) =>
      step?.header ? { ...prev, ...step?.header } : initialHeaderValues
    );

    setFields((prev) => (step?.fields ? step?.fields : [initialFieldValues]));
  }, [stepID]);

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleStepBlur}
              value={stepValues.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleStepBlur}
              value={stepValues.caption || ""}
              variant="outlined"
              size="medium"
              label="Caption"
              name="caption"
              fullWidth
            />
          </div>
          <FormControl className={css.form_control} size="medium">
            <InputLabel id="EntityId">Entität</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="EntityId"
              id="demo-select-small"
              value={stepValues?.entityId || ""}
              label="Entität"
              name="entityId"
              onChange={handleChange}
              onBlur={handleStepBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {entityDefinitions?.map((entity) => (
                <>
                  {!entity.isSystemEntity && (
                    <MenuItem value={entity.entityId}>
                      {entity.caption}
                    </MenuItem>
                  )}
                </>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={css.header_form_wrapper}>
        <HeaderForm
          handleHeaderBlur={handleHeaderBlur}
          headerValues={headerValues}
          setHeaderValues={setHeaderValues}
        />
        <RecordViewFields
          entityId={stepValues.entityId}
          fields={fields}
          setFields={setFields}
          handleFieldsBlur={handleFieldsBlur}
        />
      </div>
    </>
  );
};

export default RecordViewForm;
