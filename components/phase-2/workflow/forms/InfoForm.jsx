import useAttensamCalls from "@/hooks/useAttensamCalls";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-comp-styles.module.css";

const permissionTypes = { User: "0", All: "1" };

const InfoForm = ({ infoFormValues, setInfoFormValues, selectedNode }) => {
  const { entities } = useSelector((state) => state.attensam.data);
  const { user } = useSelector((state) => state.settings);
  const [shownEntities, setShownEntities] = useState(entities);

  const { getEntitiesCall } = useAttensamCalls();

  const handleChange = (e) => {
    setInfoFormValues({ ...infoFormValues, [e.target.name]: e.target.value });
  };

  // const handleBlur = (e)=>

  // useEffect(() => {
  //   if (entities || !user?.token) return;
  //   getEntitiesCall();
  // }, [user]);

  return (
    <>
      {selectedNode && (
        <div className={css.form_container}>
          <div className={css.input_wrapper}>
            <TextField
              onChange={(e) => selectedNode.changeEvent(e, selectedNode)}
              value={selectedNode.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="Name"
              placeholder={selectedNode.type}
            />
          </div>
          <div className={css.input_wrapper}>
            <FormControl sx={{ minWidth: 120, width: "100%" }} size="medium">
              <InputLabel id="EntityId">Entität</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="EntityId"
                id="demo-select-small"
                value={infoFormValues?.EntityId || ""}
                label="Entität"
                name="EntityId"
                onChange={handleChange}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {shownEntities?.map((entity) => (
                  <MenuItem value={entity.id}>{entity.caption}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}
      {!selectedNode && (
        <div className={css.form_container}>
          <div className={css.input_wrapper}>
            <TextField
              onChange={handleChange}
              value={infoFormValues.Name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="Name"
            />
            <TextField
              onChange={handleChange}
              value={infoFormValues.Caption || ""}
              variant="outlined"
              size="medium"
              label="Caption"
              name="Caption"
            />
            <FormControl sx={{ minWidth: 120, width: "100%" }} size="medium">
              <InputLabel id="EntityId">Entität</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="EntityId"
                id="demo-select-small"
                value={infoFormValues?.EntityId || ""}
                label="Entität"
                name="EntityId"
                onChange={handleChange}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {shownEntities?.map((entity) => (
                  <MenuItem value={entity.id}>{entity.caption}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120, width: "100%" }} size="medium">
              <InputLabel id="PermissionType">Berechtigungstyp</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="PermissionType"
                id="demo-select-small"
                value={infoFormValues?.PermissionType || ""}
                label="Berechtigungstyp"
                name="PermissionType"
                onChange={handleChange}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {Object.keys(permissionTypes)?.map((pType) => (
                  <MenuItem value={permissionTypes[pType]}>{pType}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={css.multiline_wrapper}>
            <TextField
              className={css.form_multiline}
              onChange={handleChange}
              value={infoFormValues.Description || ""}
              variant="outlined"
              label="Beschreibung"
              name="Description"
              multiline
              rows={11}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InfoForm;
