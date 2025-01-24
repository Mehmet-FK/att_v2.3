import IconSelect from "@/components/form-elements/IconSelect";
import ListViewElementRow from "./ListViewElementRow";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ListViewElement = ({ element, entityFields }) => {
  const [elementValues, setElementValues] = useState(element);

  const { listViewElementRows } = useSelector((state) => state.workflow);

  const { createListViewElementRow, updateListViewElementValue } =
    useWorkflowForms();

  const elementRows = listViewElementRows.filter(
    (lver) => lver.listViewElementId === element?.listViewElementId
  );
  const handleAddListViewElementRow = () => {
    createListViewElementRow(element.listViewElementId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElementValues({ ...elementValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateListViewElementValue(name, value, element.listViewElementId);
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          sx={{ fontSize: "smaller" }}
          expandIcon={<ExpandMoreIcon fontSize="small" />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          List View Element
        </AccordionSummary>
        <AccordionDetails>
          <div className={css.flex_column}>
            <div className={css.flex_column}>
              <IconSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={elementValues?.icon || ""}
              />
              {elementRows.map((row) => (
                <ListViewElementRow
                  key={row.listViewElementRowId}
                  elementID={element.listViewElementRowId}
                  elementRowValues={row}
                  entityFields={entityFields}
                />
              ))}
            </div>

            <Button variant="contained" onClick={handleAddListViewElementRow}>
              List Element Anlegen
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ListViewElement;
