import IconSelect from "@/components/form-elements/IconSelect";
import css from "@/styles/workflow-forms-styles/header-form.module.css";
import { TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ViewHeaderRow from "./ViewHeaderRow";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import ColorPicker from "../common-form-elements/ColorPicker";
import Accordion from "@/components/ui-components/Accordion";
import ConfirmModal from "@/components/ui-components/ConfirmModal";

const ViewHeaderForm = ({ viewId, entityFields, defaultExpanded }) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

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
          setConfirmModalValues={setConfirmModalValues}
        />
      )),
    [viewHeaderRows, entityFields]
  );

  useEffect(() => {
    setHeaderValues(header);
  }, [selectedStepId]);
  return (
    <>
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />
      <div className={css.header_container}>
        <Accordion
          headerProps={{ sx: { fontSize: "smaller", paddingBlock: "0" } }}
          header={"Header"}
        >
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

            <Accordion
              headerProps={{ sx: { fontSize: "smaller", paddingBlock: "0" } }}
              bodyProps={{ sx: { paddingTop: "0" } }}
              header={"Header Zeilen"}
            >
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
            </Accordion>
          </div>
        </Accordion>
      </div>
    </>
  );
};

export default ViewHeaderForm;
