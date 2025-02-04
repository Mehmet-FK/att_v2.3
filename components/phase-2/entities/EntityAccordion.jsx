import css from "@/styles/entity-styles/entities.module.css";
import Accordion from "@/components/ui-components/Accordion";
import { MenuItem, TextField } from "@mui/material";
import Select from "@/components/form-elements/Select";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import AutoCompleteSelect from "../workflow/forms/common-form-elements/AutoCompleteSelect";
import { useAutoCompleteEntities } from "@/context/AutoCompleteEntityContext";

const EntityAccordion = () => {
  const entityState = useSelector((state) => state.entity);

  const [entityFormValues, setEntityFormValues] = useState({});

  const views = useSelector((state) => state.attensam.data?.views); // DataSource
  const { autoCompleteEntities } = useAutoCompleteEntities();

  const { getViewsCall } = useAttensamCalls();
  const { updateEntityValue } = useEntityForm();

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setEntityFormValues({ ...entityFormValues, [name]: newValue });
  };

  const handleBlur = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    updateEntityValue(name, newValue);
  };

  useEffect(() => {
    if (!views) {
      getViewsCall();
    }
  }, []);

  useEffect(() => {
    const {
      entityFields,
      entitySortings,
      fieldValidations,
      fieldOptions,
      fieldProperties,
      ...entityData
    } = entityState;
    setEntityFormValues(entityData);
  }, [entityState]);
  return (
    <Accordion accordionProps={{ defaultExpanded: true }} header={"ENTITÄT"}>
      <div className={css.entityFormGroup}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={entityFormValues?.name || ""}
              size="small"
              label="Name"
              name="name"
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={entityFormValues?.caption || ""}
              size="small"
              name="caption"
              label="Caption"
              variant="outlined"
              required
            />
            <Select
              label="DataSource"
              name="dataSource"
              width="100%"
              value={entityFormValues?.dataSource || ""}
              onChange={handleBlur}
            >
              {views?.map((opt, index) => (
                <MenuItem key={index} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: { key: "id", caption: "caption" },
                options: autoCompleteEntities || [],
                name: "parentEntityId",
                value: entityFormValues.parentEntityId || "",
                label: "Parent Entity",
              }}
              helperProps={{
                className: css.auto_complete_select,
                fullWidth: true,
                size: "small",
              }}
            />
          </div>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={entityFormValues?.fileSource || ""}
              size="small"
              name="fileSource"
              label="FileSource"
              variant="outlined"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={entityFormValues?.maxResults || ""}
              size="small"
              name="maxResults"
              label="maxResults"
              variant="outlined"
              type="number"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={entityFormValues?.defaultIconPath || ""}
              size="small"
              name="defaultIconPath"
              label="defaultIconPath"
              variant="outlined"
              fullWidth
            />
            <div className={css.flex_row}>
              <Select
                label="DataSourceType"
                name="dataSourceType"
                value={entityFormValues?.dataSourceType?.toString() || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                width="100%"
              >
                {[0, 1]?.map((opt, index) => (
                  <MenuItem key={index} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
              <CheckBox
                label="isSystemEntity"
                name="isSystemEntity"
                checked={entityFormValues.isSystemEntity}
                handleChange={handleChange}
                onBlur={handleBlur}
                size={"small"}
                sx={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default EntityAccordion;
