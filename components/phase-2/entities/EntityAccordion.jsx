import css from "@/styles/entities.module.css";
import Accordion from "@/components/ui-components/Accordion";
import { MenuItem, TextField } from "@mui/material";
import Select from "@/components/form-elements/Select";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";

const EntityAccordion = () => {
  const entityState = useSelector((state) => state.entity);

  const [entityFormValues, setEntityFormValues] = useState({});

  const { views } = useSelector((state) => state.attensam.data); // DataSource

  const { getViewsCall } = useAttensamCalls();

  const handleChange = (e) => {
    setEntityForm({ ...entityForm, [e.target.name]: e.target.value });
    console.log(entityForm);
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
    <Accordion expandDefault header={"ENTITIY"}>
      <div className={css.entityFormGroup}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              fullWidth
              onChange={handleChange}
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
              onChange={handleChange}
            >
              {views?.map((opt, index) => (
                <MenuItem key={index} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>

            <Select
              label="DataSourceType"
              name="dataSourceType"
              value={entityFormValues?.dataSourceType?.toString() || ""}
              onChange={handleChange}
              fullWidth
            >
              {[0, 1]?.map((opt, index) => (
                <MenuItem key={index} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              value={entityFormValues?.fileSource || ""}
              size="small"
              name="fileSource"
              label="FileSource"
              variant="outlined"
              fullWidth
            />
            <TextField
              onChange={handleChange}
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
              value={entityFormValues?.defaultIconPath || null}
              size="small"
              name="defaultIconPath"
              label="defaultIconPath"
              variant="outlined"
              fullWidth
            />
            <CheckBox
              label="isSystemEntity"
              name="isSystemEntity"
              checked={entityFormValues.isSystemEntity}
              handleChange={handleChange}
              size={"small"}
              sx={{
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default EntityAccordion;
