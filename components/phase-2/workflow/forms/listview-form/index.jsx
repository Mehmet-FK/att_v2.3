import useAttensamCalls from "@/hooks/useAttensamCalls";
import { TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import ViewHeaderForm from "../header-form";
import ListViewElement from "./ListViewElement";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";
import CustomSelect from "../common-form-elements/CustomSelect";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";

const ListViewForm = ({ stepID, entitiesForAutoSelect }) => {
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
        <div className={css.flex_row}>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={listViewValues?.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={listViewValues?.caption || ""}
            variant="outlined"
            size="medium"
            label="Caption"
            name="caption"
            fullWidth
          />
          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: handleBlur,
              preferences: { key: "id", caption: "caption" },
              options: entitiesForAutoSelect,
              name: "entityId",
              value: listViewValues.entityId || "",
              label: "Entität",
            }}
            helperProps={{
              className: css.form_control,
            }}
          />
          <div style={{ display: "flex", width: "50%" }}>
            <CheckBox
              sx={{
                width: "100%",
              }}
              name="hasLookup"
              checked={listViewValues?.hasLookup}
              handleChange={handleChange}
              handleBlur={handleBlur}
              label={"hasLookup"}
            />
            <CheckBox
              sx={{
                width: "100%",
              }}
              name="onlyOnline"
              checked={listViewValues?.onlyOnline}
              handleChange={handleChange}
              handleBlur={handleBlur}
              label={"onlyOnline"}
            />
          </div>
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