import IconSelect from "@/components/form-elements/IconSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import css from "@/styles/workflow-forms/header-form.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ViewHeaderRow from "./ViewHeaderRow";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import ColorPicker from "../common-form-elements/ColorPicker";

const ViewHeaderForm = ({ viewId, entityFields, defaultExpanded }) => {
  const { headerRows, headers, selectedStepId } = useSelector(
    (state) => state.workflow
  );
  const { createViewHeaderRow, updateViewHeaderValue } = useWorkflowForms();
  const header = useMemo(
    () => headers.find((h) => h.viewId === viewId),
    [selectedStepId]
  );

  const viewHeaderRows = useMemo(
    () => headerRows.filter((vhr) => vhr.headerId === header?.headerId),
    [headerRows, header]
  );

  const [headerValues, setHeaderValues] = useState(header);

  const addViewHeaderRow = () => {
    const headerId = header.headerId;
    createViewHeaderRow(headerId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeaderValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const headerId = header.headerId;
    updateViewHeaderValue(name, value, headerId);
  };

  const MemoViewHeaderRows = useMemo(
    () =>
      viewHeaderRows.map((rowValue) => (
        <ViewHeaderRow
          key={rowValue?.headerRowId}
          rowId={rowValue?.headerRowId}
          entityFields={entityFields}
          headerId={headerValues?.headerId}
        />
      )),
    [viewHeaderRows, entityFields]
  );

  useEffect(() => {
    setHeaderValues(header);
  }, [selectedStepId]);
  return (
    <div className={css.header_container}>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary
          sx={{ fontSize: "smaller", paddingBlock: "0" }}
          expandIcon={<ExpandMoreIcon fontSize="small" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Header
        </AccordionSummary>
        <AccordionDetails>
          <div className={css.flex_column}>
            <div className={css.flex_row}>
              <div className={css.flex_column}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={headerValues?.caption || ""}
                  variant="outlined"
                  size="medium"
                  label="Caption"
                  name="caption"
                  fullWidth
                />
                <IconSelect
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={headerValues?.defaultIcon || ""}
                  name={"defaultIcon"}
                />
              </div>
              <div className={css.flex_column}>
                <ColorPicker
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={headerValues?.gradientStart || "#000000"}
                  label="Gradient Start"
                  name="gradientStart"
                  fullWidth
                />
                <ColorPicker
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={headerValues?.gradientEnd || "#000000"}
                  label="Gradient End"
                  name="gradientEnd"
                  fullWidth
                />
              </div>
            </div>

            <Accordion defaultExpanded={defaultExpanded}>
              <AccordionSummary
                sx={{ fontSize: "smaller", paddingBlock: "0" }}
                expandIcon={<ExpandMoreIcon fontSize="small" />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Header Zeilen
              </AccordionSummary>
              <AccordionDetails sx={{ paddingTop: "0" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  {MemoViewHeaderRows}
                </div>
                <div>
                  <button
                    disabled={viewHeaderRows.length > 4}
                    onClick={addViewHeaderRow}
                  >
                    add row
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ViewHeaderForm;
