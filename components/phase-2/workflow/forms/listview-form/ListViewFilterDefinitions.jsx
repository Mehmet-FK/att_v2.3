import css from "@/styles/workflow-forms/list-view-form.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSelect from "../common-form-elements/CustomSelect";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";

const FilterDefinitionForm = ({
  definitionValues,
  deleteDefinition,
  updateDefinitionValue,
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
    const definitionID = definitionFormValues.filterDefinitionId;
    updateDefinitionValue(name, newValue, definitionID);
  };

  const handleDeleteDefinition = (e) => {
    if (e.detail < 2) return;
    const definitionID = definitionFormValues.filterDefinitionId;
    deleteDefinition(definitionID);
  };

  useEffect(() => {
    setDefinitionFormValues(definitionValues);
  }, [definitionValues?.filterDefinitionId]);

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

const ListViewFilterDefinitions = ({ listViewId, entityFields }) => {
  const { listViewFilterDefinitions } = useSelector((state) => state.workflow);
  const {
    createListViewFilterDefinition,
    updateFilterDefinitionValue,
    deleteFilterDefinition,
  } = useWorkflowForms();

  const filterDefinitions = useMemo(
    () =>
      listViewFilterDefinitions.filter((fd) => fd.listViewId === listViewId),
    [listViewFilterDefinitions, listViewId]
  );

  const [definitionList, setDefinitionList] = useState(filterDefinitions);

  const handleAddFilterDefinition = () => {
    createListViewFilterDefinition(listViewId);
  };

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
        <div className={css.flex_column}>
          <div
            className={css.flex_row}
            style={{ flexWrap: "wrap", rowGap: "10px" }}
          >
            {filterDefinitions.map((definition) => (
              <FilterDefinitionForm
                definitionValues={definition}
                deleteDefinition={deleteFilterDefinition}
                updateDefinitionValue={updateFilterDefinitionValue}
                entityFields={entityFields}
              />
            ))}
          </div>

          <Button variant="contained" onClick={handleAddFilterDefinition}>
            Definition Anlegen
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ListViewFilterDefinitions;
