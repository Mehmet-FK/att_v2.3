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

const replaceItem = (arr, item, id) => {
  const index = arr.findIndex((el) => el.id === id);
  arr.splice(index, 1, item);
  return arr;
};

/* const HeaderColumn = ({
  headerValues,
  setHeaderValues,
  id,
  handleHeaderBlur,
}) => {
  const columnTypes = {
    Text: "0",
    Value: "1",
    Icon: "2",
    Variable: "3",
  };
  const column = headerValues.columns.find((col) => col.id === id);
  const removeCol = () => {
    setHeaderValues((prev) => ({
      ...prev,
      columns: prev.columns.filter((col) => col.id !== id),
    }));

    handleHeaderBlur();
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    setHeaderValues((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === id ? { ...col, [name]: value } : col
      ),
    }));
  };

  const columnKeys = Object.keys(columnTypes);
  return (
    <div
      style={{
        border: "1px solid #aaa5",
        padding: "5px",
        position: "relative",
      }}
      className={css.flex_column}
    >
      <div className={css.flex_row}>
        <FormControl size="small" fullWidth>
          <InputLabel size="small" id="demo-simple-select-label">
            Column Type
          </InputLabel>
          <Select
            onChange={(e) => handleChange(e, id)}
            onBlur={handleHeaderBlur}
            value={column.columnType || ""}
            MenuProps={{
              style: { zIndex: 35001 },
            }}
            name="columnType"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label=" Column Type"
            size="small"
          >
            <MenuItem value={""}>None</MenuItem>
            {columnKeys.map((colType) => (
              <MenuItem key={colType} value={columnTypes[colType]}>
                {colType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          onChange={(e) => handleChange(e, id)}
          onBlur={handleHeaderBlur}
          value={column?.columnValue || ""}
          variant="outlined"
          size="small"
          label="Column Value"
          name="columnValue"
          fullWidth
        />
      </div>
      <div className={css.flex_row}>
        <TextField
          onChange={(e) => handleChange(e, id)}
          onBlur={handleHeaderBlur}
          value={column?.colSpan || ""}
          variant="outlined"
          size="small"
          label="Column Span"
          name="colSpan"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChange(e, id)}
          onBlur={handleHeaderBlur}
          value={column?.rowSpan || ""}
          variant="outlined"
          size="small"
          label="Row Span"
          name="rowSpan"
          fullWidth
        />
      </div>
      <div className={css.flex_row}>
        <TextField
          onChange={(e) => handleChange(e, id)}
          onBlur={handleHeaderBlur}
          value={column?.fontFamily || ""}
          variant="outlined"
          size="small"
          label="Font Family"
          name="fontFamily"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChange(e, id)}
          onBlur={handleHeaderBlur}
          value={column?.fontColor || ""}
          variant="outlined"
          size="small"
          label="Font Color"
          name="fontColor"
          fullWidth
        />
      </div>
      <div>
        <span
          title="remove column"
          className={css.remove_column_btn}
          onClick={removeCol}
        >
          ×
        </span>
      </div>
    </div>
  );
}; */

/* const HeaderRow = ({ id, headerValues, setHeaderValues, handleHeaderBlur }) => {
  const removeRow = () => {
    setHeaderValues((prev) => ({
      ...prev,
      rows: prev.rows.filter((row) => row.id !== id),
      columns: prev.columns.filter((col) => col.rowId !== id),
    }));
    handleHeaderBlur();
  };

  const columns = headerValues.columns.filter((col) => col.rowId === id);

  return (
    <div
      className={css.flex_row}
      style={{ position: "relative", columnGap: "0" }}
    >
      <div>
        <span
          title="remove row"
          className={css.remove_row_btn}
          onClick={removeRow}
        >
          ×
        </span>
      </div>
      {columns.map((col) => (
        <HeaderColumn
          key={col.id}
          id={col.id}
          handleHeaderBlur={handleHeaderBlur}
          headerValues={headerValues}
          setHeaderValues={setHeaderValues}
        />
      ))}
    </div>
  );
}; */

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
