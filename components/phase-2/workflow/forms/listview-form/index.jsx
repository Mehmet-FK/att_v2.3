import useAttensamCalls from "@/hooks/useAttensamCalls";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import ViewHeaderForm from "../header-form";

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

const ListViewForm = ({ stepID }) => {
  const { entities } = useSelector((state) => state.attensam.data);

  const [listViewValues, setListViewValues] = useState(initialStepValues);
  const [headerValues, setHeaderValues] = useState(initialHeaderValues);
  const [listElements, setListElements] = useState([initialListElement]);

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;

    setListViewValues({
      ...listViewValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const viewId = stepID + "-listView";

  const handleListViewFormBlur = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;
    updateListView(name, inputValue, viewId);
  };

  const addListElement = () => {
    const max = Math.max(...listElements.map((el) => el.id), 0);
    setListElements((prev) => [
      ...prev,
      { ...initialListElement, id: max + 1 },
    ]);
  };

  /*   useEffect(() => {
    if (entities || !user?.token) return;
    getEntitiesCall();
  }, [user]);
 */
  /*   useEffect(() => {
    const step = workflowSteps.find((step) => step.id === viewId);

    setListViewValues((prev) => ({
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
  }, [viewId]); */

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleListViewFormBlur}
              value={listViewValues.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleListViewFormBlur}
              value={listViewValues.caption || ""}
              variant="outlined"
              size="medium"
              label="Caption"
              name="caption"
              fullWidth
            />
            <div style={{ display: "flex", width: "50%" }}>
              <FormControlLabel
                sx={{
                  width: "100%",
                }}
                control={
                  <Checkbox
                    name="hasLookup"
                    checked={listViewValues.hasLookup}
                    onChange={handleChange}
                    onBlur={handleListViewFormBlur}
                  />
                }
                label={<span style={{ fontSize: "smaller" }}>hasLookup</span>}
                labelPlacement="end"
              />
              <FormControlLabel
                sx={{
                  width: "100%",
                }}
                control={
                  <Checkbox
                    name="onlyOnline"
                    checked={listViewValues.onlyOnline}
                    onChange={handleChange}
                    onBlur={handleListViewFormBlur}
                  />
                }
                label={<span style={{ fontSize: "smaller" }}>onlyOnline</span>}
                labelPlacement="end"
              />
            </div>
          </div>

          <FormControl className={css.form_control} size="medium">
            <InputLabel id="EntityId">Entität</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="EntityId"
              id="demo-select-small"
              value={listViewValues?.entityId || ""}
              label="Entität"
              name="entityId"
              onChange={handleChange}
              onBlur={handleListViewFormBlur}
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
        <ViewHeaderForm
          viewId={viewId}
          headerValues={headerValues}
          setHeaderValues={setHeaderValues}
        />
        {/*
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
                  <ListViewElement
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
        </div>*/}
      </div>
    </>
  );
};

export default ListViewForm;
