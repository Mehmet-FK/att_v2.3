import useAttensamCalls from "@/hooks/useAttensamCalls";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import HeaderForm from "./HeaderForm";
import IconSelect from "@/components/form-elements/IconSelect";

const initialStepValues = {
  entityId: "",
  name: "",
  caption: "",
  hasLookup: false,
};

const initialHeaderValues = {
  caption: "",
  icon: "",
  gradientStart: "",
  gradientEnd: "",
  rows: [
    {
      id: 1,
    },
  ],
  columns: [
    { id: 1, rowId: 1 },
    { id: 2, rowId: 1 },
    { id: 3, rowId: 1 },
  ],
};
const initialListElement = {
  id: 1,
  icon: "",
  listViewRows: [
    {
      id: 1,
      listViewRowNumber: 1,
      text: "",
      fontFamily: "",
      fontColor: "",
    },
  ],
};

const TileViewForm = ({ stepID }) => {
  const [stepValues, setStepValues] = useState(initialStepValues);
  const [headerValues, setHeaderValues] = useState(initialHeaderValues);

  const { entities } = useSelector((state) => state.attensam.data);
  const { user } = useSelector((state) => state.settings);
  const { workflowSteps } = useSelector((state) => state.workflow);

  const { handleWFStepBlur } = useWorkflowForms();

  const handleHeaderBlur = () => {
    handleWFStepBlur("header", headerValues);
  };

  useEffect(() => {
    const step = workflowSteps.find((step) => step.id === stepID);

    setStepValues((prev) => ({
      ...prev,
      name: step?.name,
      entityId: step?.entityId,
      caption: step?.caption,
      hasLookup: step?.hasLookup,
    }));

    setHeaderValues((prev) =>
      step?.header ? { ...prev, ...step?.header } : initialHeaderValues
    );
  }, [stepID]);

  return (
    <>
      <HeaderForm
        handleHeaderBlur={handleHeaderBlur}
        headerValues={headerValues}
        setHeaderValues={setHeaderValues}
        defaultExpanded={true}
      />
    </>
  );
};

export default TileViewForm;
