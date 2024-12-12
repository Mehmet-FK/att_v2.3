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
import { useEffect, useState } from "react";
import ViewHeaderRow from "./ViewHeaderRow";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";

const initialViewHeaderValues = {
  headerId: "",
  viewType: 0,
  viewId: "",
  caption: "",
  defaultIcon: "",
  gradientStart: "",
  gradientEnd: "",
};

const ViewHeaderForm = ({ viewId, defaultExpanded }) => {
  const [headerValues, setHeaderValues] = useState(initialViewHeaderValues);
  const { headerRows, headers } = useSelector((state) => state.workflow);
  const { createViewHeaderRow } = useWorkflowForms();

  const header = headers.find((h) => h.viewId === viewId);

  const addRow = () => {
    const headerId = header.headerId;
    createViewHeaderRow(headerId);
  };

  const handleChange = (e) => {
    setHeaderValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
  // URL.createObjectURL(files[0])

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
                  // onBlur={handleHeaderBlur}
                  value={headerValues?.caption || ""}
                  variant="outlined"
                  size="medium"
                  label="Caption"
                  name="caption"
                  fullWidth
                />
                <IconSelect
                  handleChange={handleChange}
                  // handleBlur={handleHeaderBlur}
                />
              </div>
              <div className={css.flex_column}>
                <TextField
                  onChange={handleChange}
                  // onBlur={handleHeaderBlur}
                  value={headerValues?.gradientStart || ""}
                  variant="outlined"
                  label="Gradient Start"
                  name="gradientStart"
                  fullWidth
                />
                <TextField
                  onChange={handleChange}
                  // onBlur={handleHeaderBlur}
                  value={headerValues?.gradientEnd || ""}
                  variant="outlined"
                  label="Gradient End"
                  name="gradientEnd"
                  fullWidth
                />
                {/* <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={
                    headerValues?.uploadIcon ? (
                      <Avatar
                        sx={{ width: "25px", height: "25px" }}
                        src={URL.createObjectURL(headerValues?.uploadIcon)}
                      />
                    ) : (
                      <ImageIcon />
                    )
                  }
                >
                  Upload Icon
                  <input
                    // className={css.imageInput}
                    hidden
                    onChange={handleUploadImage}
                    onBlur={handleHeaderBlur}
                    name="uploadIcon"
                    type="file"
                    accept="image/*"
                    placeholder="Icon URL"
                  />
                </Button> */}
                {/*   <div className={css.imageInputWrapper}>
                  {headerValues?.icon && (
                    <Image
                      src={headerValues?.icon}
                      alt="icon"
                      loading="eager"
                      width={40}
                      height={40}
                      priority
                    />
                  )}
                  <input
                    className={css.imageInput}
                    onChange={handleUploadImage}
                    name="icon"
                    type="file"
                    accept="image/*"
                    placeholder="Icon URL"
                  />
                  <span className={css.imgBtn}>{<ImageIcon />}</span>
                </div> */}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              {headerRows.map((rowValue) => (
                <ViewHeaderRow
                  key={rowValue.headerRowId}
                  rowId={rowValue.headerRowId}
                  headerId={headerValues.headerId}
                  // handleHeaderBlur={handleHeaderBlur}
                  // setHeaderValues={setHeaderValues}
                />
              ))}

              <button disabled={headerRows.length > 4} onClick={() => addRow()}>
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
