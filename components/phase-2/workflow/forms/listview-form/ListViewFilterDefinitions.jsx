import css from "@/styles/workflow-forms/list-view-form.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSelect from "../common-form-elements/CustomSelect";

const FilterDefinitionForm = ({
  definitionValues,
  deleteDefinition,
  updateFilterDefinitionValue,
  entityFields,
}) => {
  const [definitionFormValues, setDefinitionFormValues] =
    useState(definitionValues);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDefinitionFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    updateFilterDefinitionValue(name, newValue, functionID);
  };

  const handleDeleteDefinition = () => {
    const definitionID = definitionFormValues.filterDefinitionId;
    deleteDefinition(definitionID);
  };

  useEffect(() => {
    setDefinitionFormValues(definitionValues);
  }, [definitionValues.filterDefinitionId]);

  return (
    <div style={{ maxWidth: "30%", width: "100%" }}>
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={<DeleteIcon color="secondary" fontSize="small" />}
        slotProps={{
          badge: {
            sx: {
              marginLeft: "10px",
              width: "1.7rem",
              height: "1.7rem",
              backgroundColor: "#ccc",
              cursor: "pointer",
              display: "flex",
              opacity: "0",
              transition: "all 0.2s ease-in-out",
            },
            onClick: handleDeleteDefinition,
          },
        }}
        sx={{
          width: "100%",

          backgroundColor: "inherit",
          "&:hover .MuiBadge-badge": {
            opacity: "1",
          },
        }}
      >
        <Card
          title={definitionFormValues?.filterDefinitionId}
          sx={{ width: "100%", backgroundColor: "inherit" }}
        >
          <CardContent>
            <div className={css.flex_column}>
              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={definitionFormValues?.fieldId}
                label="Feld"
                name="fieldId"
                size="small"
                preferences={{ key: "id", caption: "caption" }}
                options={entityFields}
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={definitionFormValues?.filterValue || ""}
                variant="outlined"
                size="small"
                label="filterValue"
                name="filterValue"
                fullWidth
              />
            </div>
          </CardContent>
        </Card>
      </Badge>
    </div>
  );
};

const filterDefinitionTemplate = {
  filterDefinitionId: "44",
  listViewId: "4",
  fieldId: 51,
  filterValue: "{Username}",
};

const ListViewFilterDefinitions = ({ listViewId, selectedEntityId }) => {
  const { listViewFilterDefinitions } = useSelector((state) => state.workflow);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const filterDefinitions = useMemo(
    () =>
      listViewFilterDefinitions.filter((fd) => fd.listViewId === listViewId),
    [listViewFilterDefinitions, listViewId]
  );

  const [definitionList, setDefinitionList] = useState([...filterDefinitions]);

  const prepareEntityFields = () => {
    const selectedEntity = entities?.find(
      (entity) => entity.id === selectedEntityId
    );
    if (!selectedEntity) return [];

    return selectedEntity.fields.map((field) => ({
      id: field.id,
      caption: field.id + "-" + field.name,
    }));
  };

  const entityFields = useMemo(() => prepareEntityFields(), [selectedEntityId]);

  return (
    <Accordion>
      <AccordionSummary
        sx={{ fontSize: "smaller" }}
        expandIcon={<ExpandMoreIcon fontSize="small" />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Filter Definitionen
      </AccordionSummary>
      <AccordionDetails>
        <div
          className={css.flex_row}
          style={{ flexWrap: "wrap", rowGap: "10px" }}
        >
          {definitionList.map((definition) => (
            <FilterDefinitionForm
              definitionValues={definition}
              entityFields={entityFields}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ListViewFilterDefinitions;
