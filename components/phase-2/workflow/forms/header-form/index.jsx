import IconSelect from "@/components/form-elements/IconSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import css from "@/styles/workflow-forms/header-form.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useEffect, useMemo, useState } from "react";
import ViewHeaderRow from "./ViewHeaderRow";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";

const ViewHeaderForm = ({ viewId, defaultExpanded }) => {
  const { headerRows, headers } = useSelector((state) => state.workflow);
  const { createViewHeaderRow, updateViewHeaderValue } = useWorkflowForms();

  const header = useMemo(
    () => headers.find((h) => h.viewId === viewId),
    [viewId, headers]
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
  const handleUploadImage = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setHeaderValues((prev) => ({
        ...prev,
        uploadIcon: files[0],
      }));
    }
  };

  useEffect(() => {
    setHeaderValues(header);
  }, [viewId]);

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
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={headerValues?.gradientStart || ""}
                  variant="outlined"
                  label="Gradient Start"
                  name="gradientStart"
                  fullWidth
                />
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={headerValues?.gradientEnd || ""}
                  variant="outlined"
                  label="Gradient End"
                  name="gradientEnd"
                  fullWidth
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              {viewHeaderRows.map((rowValue) => (
                <ViewHeaderRow
                  key={rowValue.headerRowId}
                  rowId={rowValue.headerRowId}
                  headerId={headerValues.headerId}
                />
              ))}

              <button
                disabled={headerRows.length > 4}
                onClick={addViewHeaderRow}
              >
                add row
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ViewHeaderForm;
