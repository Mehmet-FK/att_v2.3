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
  Select,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import HeaderForm from "./HeaderForm";
import IconSelect from "@/components/form-elements/IconSelect";

const permissionTypes = { User: "0", All: "1" };

const initialStepValues = {
  entityId: "",
  name: "",
  caption: "",
  hasLookup: false,
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
const initialListElement = {
  id: 1,
  icon: "",
  listViewRows: [
    {
      id: 1,
      listViewRowNumber: 1,
      text: "",
      fontFamily: "",
      fontColor: "",
    },
  ],
};

const ElementRow = ({
  elementID,
  elementRowValues,
  setListElements,
  handleElementsBlur,
}) => {
  const removeRow = () => {
    setListElements((prev) =>
      prev.map((el) =>
        el.id === elementID
          ? {
              ...el,
              listViewRows: el.listViewRows.filter(
                (r) => r.id !== elementRowValues.id
              ),
            }
          : el
      )
    );
  };

  const handleChangeElementRow = (e) => {
    const { name, value } = e.target;

    setListElements((prev) =>
      prev.map((el) =>
        el.id === elementID
          ? {
              ...el,
              listViewRows: el.listViewRows.map((row) =>
                row.id === elementRowValues.id ? { ...row, [name]: value } : row
              ),
            }
          : el
      )
    );
  };

  return (
    <div
      style={{
        border: "1px solid #aaa5",
        padding: "5px",
        position: "relative",
      }}
      className={css.flex_column}
    >
      <div className={css.flex_row}>
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.text || ""}
          variant="outlined"
          size="small"
          label="Text"
          name="text"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.listViewRowNumber || ""}
          variant="outlined"
          size="small"
          label="Row Number"
          name="listViewRowNumber"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.fontFamily || ""}
          variant="outlined"
          size="small"
          label="Font Family"
          name="fontFamily"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.fontColor || ""}
          variant="outlined"
          size="small"
          label="Font Color"
          name="fontColor"
          fullWidth
        />
      </div>
      <span
        title="remove row"
        className={css.remove_row_btn}
        onClick={removeRow}
      >
        ×
      </span>
    </div>
  );
};

const ListElements = ({
  element,
  listElements,
  setListElements,
  handleElementsBlur,
}) => {
  const addELementRow = () => {
    const max = Math.max(...element.listViewRows.map((el) => el.id), 0);
    setListElements((prev) =>
      prev.map((el) =>
        el.id === element.id
          ? {
              ...el,
              listViewRows: [
                ...el.listViewRows,
                {
                  listViewRowNumber: el.listViewRows.length + 1,
                  text: "",
                  fontFamily: "",
                  fontColor: "",
                  id: max + 1,
                },
              ],
            }
          : el
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListElements((prev) =>
      prev.map((el) => (el.id === element.id ? { ...el, [name]: value } : el))
    );
  };

  return (
    <>
      <div className={css.elements_container}>
        <div className={css.flex_row}>
          <span
            className={css.remove_element_btn}
            title="Remove Element"
            onClick={addELementRow}
          >
            ×
          </span>
          <div className={css.flex_column}>
            <IconSelect
              size={"small"}
              handleChange={handleChange}
              handleBlur={handleElementsBlur}
            />
            {element.listViewRows.map((elementRow) => (
              <ElementRow
                key={elementRow.id}
                elementID={element.id}
                elementRowValues={elementRow}
                setListElements={setListElements}
                // handleChangeElementRow={handleChangeElementRow}
                handleElementsBlur={handleElementsBlur}
              />
            ))}
          </div>
          <span
            className={css.add_row_btn}
            title="Add Row"
            onClick={addELementRow}
          >
            +
          </span>
        </div>
      </div>
      <Divider />
    </>
  );
};

const ListViewForm = ({ stepID }) => {
  const { entities } = useSelector((state) => state.attensam.data);
  const { user } = useSelector((state) => state.settings);
  const { workflowSteps } = useSelector((state) => state.workflow);

  const { getEntitiesCall } = useAttensamCalls();
  const { handleWFStepBlur } = useWorkflowForms();

  const [stepValues, setStepValues] = useState(initialStepValues);
  const [headerValues, setHeaderValues] = useState(initialHeaderValues);
  const [listElements, setListElements] = useState([initialListElement]);

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;

    setStepValues({
      ...stepValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleStepBlur = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(name);
    handleWFStepBlur(name, type === "checkbox" ? checked : value);
  };

  const handleHeaderBlur = () => {
    handleWFStepBlur("header", headerValues);
  };

  const handleElementsBlur = () => {
    handleWFStepBlur("listViewElements", listElements);
  };

  const addListElement = () => {
    const max = Math.max(...listElements.map((el) => el.id), 0);
    setListElements((prev) => [
      ...prev,
      { ...initialListElement, id: max + 1 },
    ]);
  };

  useEffect(() => {
    if (entities || !user?.token) return;
    getEntitiesCall();
  }, [user]);

  useEffect(() => {
    const step = workflowSteps.find((step) => step.id === stepID);
    console.log(stepID);
    console.log(step);
    setStepValues((prev) => ({
      ...prev,
      name: step?.name,
      entityId: step?.entityId,
      caption: step?.caption,
      hasLookup: step?.hasLookup,
    }));

    setHeaderValues((prev) =>
      step?.header ? { ...prev, ...step?.header } : initialHeaderValues
    );
    setListElements((prev) =>
      step?.listViewElements ? step?.listViewElements : [initialListElement]
    );
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
            <FormControlLabel
              sx={{
                width: "100%",
              }}
              control={
                <Checkbox
                  name="hasLookup"
                  checked={stepValues.hasLookup}
                  onChange={handleChange}
                  onBlur={handleStepBlur}
                />
              }
              label={<span style={{ fontSize: "smaller" }}>hasLookup</span>}
              labelPlacement="end"
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
              {entities?.map((entity) => (
                <MenuItem value={entity.id}>{entity.caption}</MenuItem>
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
        <div className={css.elements_container}>
          <Accordion>
            <AccordionSummary
              sx={{ fontSize: "smaller", paddingBlock: "0" }}
              expandIcon={<ExpandMoreIcon fontSize="small" />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              List View Elements
            </AccordionSummary>
            <AccordionDetails>
              <div className={css.flex_column} style={{ rowGap: "10px" }}>
                {listElements.map((element) => (
                  <ListElements
                    key={element.id}
                    id={element.id}
                    element={element}
                    listElements={listElements}
                    setListElements={setListElements}
                    handleElementsBlur={handleElementsBlur}
                  />
                ))}

                <button onClick={addListElement}>Add List Element</button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default ListViewForm;
