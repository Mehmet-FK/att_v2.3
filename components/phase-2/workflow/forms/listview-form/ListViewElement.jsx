import IconSelect from "@/components/form-elements/IconSelect";
import ListViewElementRow from "./ListViewElementRow";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const ListViewElement = ({ element, listViewId }) => {
  const [elementValues, setElementValues] = useState(element);

  const { listViewElementRows } = useSelector((state) => state.workflow);

  const { createListViewElementRow, updateListViewElementValue } =
    useWorkflowForms();

  const elementRows = listViewElementRows.filter(
    (lver) => lver.listViewElementId === element.listViewElementId
  );
  const addListViewElementRow = () => {
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
      <div className={css.elements_container}>
        <Accordion>
          <AccordionSummary
            sx={{ fontSize: "smaller", paddingBlock: "0" }}
            expandIcon={<ExpandMoreIcon fontSize="small" />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            List View Element
          </AccordionSummary>
          <AccordionDetails>
            <div className={css.flex_column} style={{ rowGap: "10px" }}>
              <div className={css.flex_row}>
                <div className={css.flex_column}>
                  <IconSelect
                    size={"small"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={elementValues?.icon || ""}
                  />
                  {elementRows.map((row) => (
                    <ListViewElementRow
                      key={row.id}
                      elementID={element.id}
                      elementRowValues={row}
                    />
                  ))}
                </div>
                <span
                  className={css.add_row_btn}
                  title="Add Row"
                  onClick={addListViewElementRow}
                >
                  +
                </span>
              </div>{" "}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default ListViewElement;
