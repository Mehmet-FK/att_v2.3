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

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import ViewHeaderForm from "../header-form";
import ListViewElement from "./ListViewElement";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";

const ListViewForm = ({ stepID }) => {
  // const { entities } = useSelector((state) => state.attensam.data);
  const entities = [];
  const { listViewElements, listViews } = useSelector(
    (state) => state.workflow
  );

  const viewId = stepID + "-listview";
  const listView = listViews.find((lv) => lv.listViewId === viewId);

  const listViewElement = listViewElements.find(
    (lve) => lve.listViewElementId === listView?.listViewElementId
  );

  const [listViewValues, setListViewValues] = useState(listView);

  const { updateListViewValue } = useWorkflowForms();

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setListViewValues({
      ...listViewValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;
    updateListViewValue(name, inputValue, viewId);
  };

  useEffect(() => {
    setListViewValues(listView);
  }, [stepID]);

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={listViewValues.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={listViewValues.caption || ""}
              variant="outlined"
              size="medium"
              label="Caption"
              name="caption"
              fullWidth
            />
            <div style={{ display: "flex", width: "50%" }}>
              <CheckBox
                sx={{
                  width: "100%",
                }}
                name="hasLookup"
                checked={listViewValues.hasLookup}
                handleChange={handleChange}
                handleBlur={handleBlur}
                label={"hasLookup"}
              />
              <CheckBox
                sx={{
                  width: "100%",
                }}
                name="onlyOnline"
                checked={listViewValues.onlyOnline}
                handleChange={handleChange}
                handleBlur={handleBlur}
                label={"onlyOnline"}
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
              onBlur={handleBlur}
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
        <ViewHeaderForm viewId={viewId} />
      </div>

      <ListViewElement element={listViewElement} listViewId={viewId} />
    </>
  );
};

export default ListViewForm;
