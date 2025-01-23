import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";

const RecordViewFunctionCard = ({
  functionValues,
  handleChange,
  workflowsForAutoCompleteSelect,
}) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <AutoCompleteSelect
          mainProps={{
            handleChange: (e) =>
              handleChange(e, functionValues.recordViewFunctionId),
            handleBlur: () => null,
            preferences: {
              key: "id",
              caption: "path",

              image: "icon",
              title: "path",
            },
            options: workflowsForAutoCompleteSelect || [],
            name: "workflowId",
            value: functionValues.workflowId || "",
            label: "Workflow",
          }}
          helperProps={
            {
              // className: css.form_control,
            }
          }
        />
      </CardContent>
    </Card>
  );
};

const RecordViewFunctionsSection = ({ recordViewId }) => {
  const { recordViewFunctions } = useSelector((state) => state.workflow);
  const workflows = useSelector((state) => state.attensam.data?.workflows);

  const [runWorkflowWorker, workflowsForAutoCompleteSelect] =
    useAutoCompleteDataWorker("/workers/prepareWorkflowsWorker.js");

  const filteredAndNormalizedFunctions = useMemo(() => {
    const filteredFunctions = recordViewFunctions.filter(
      (rvf) => rvf.recordViewId === recordViewId
    );
    return filteredFunctions.toHashMap("recordViewFunctionId");
  }, [recordViewFunctions, recordViewId]);

  const [recordFunctions, setRecordFunctions] = useState({
    ...filteredAndNormalizedFunctions,
  });

  const handleChange = (e, functionId) => {
    const { value } = e.target;

    const copyFunctions = { ...recordFunctions };
    copyFunctions[functionId] = {
      ...copyFunctions[functionId],
      workflowId: value,
    };
    console.log(copyFunctions[functionId]);
    setRecordFunctions(copyFunctions);
  };

  useEffect(() => {
    if (workflows) {
      runWorkflowWorker(workflows);
    }
  }, [workflows]);
  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary
        sx={{ fontSize: "smaller", paddingBlock: "0" }}
        expandIcon={<ExpandMoreIcon fontSize="small" />}
        aria-controls="record-functions-content"
        id="record-functions-header"
      >
        Record Funktionen
      </AccordionSummary>
      <AccordionDetails>
        <div className={css.flex_row}>
          {Object.values(recordFunctions)?.map((rvf) => (
            <RecordViewFunctionCard
              functionValues={rvf}
              handleChange={handleChange}
              workflowsForAutoCompleteSelect={workflowsForAutoCompleteSelect}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default RecordViewFunctionsSection;
