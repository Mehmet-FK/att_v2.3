import {
  addWorkflowStep,
  changeStepValue,
  changeWorkflowValue,
  removeWorkflowStep,
  updateSelectedStep as updateStep,
  updateTotalWorkflow,
} from "@/redux/slices/workflowSlice";
import { useDispatch, useSelector } from "react-redux";

const useWorkflowForms = () => {
  const dispatch = useDispatch();
  const { selectedStepID } = useSelector((state) => state.workflow);

  const handleWorkflowChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeWorkflowValue({ value, name }));
  };

  const createWorkflowStep = (stepID) => {
    const step = {
      id: stepID,
    };

    dispatch(addWorkflowStep({ step }));
  };

  const deleteWorkflowStep = (stepID) => {
    dispatch(removeWorkflowStep({ id: stepID }));
  };

  const handleWFStepBlur = (name, value) => {
    // console.log(value);
    dispatch(changeStepValue({ name, value }));
  };

  const updateSelectedStep = (stepID) => {
    if (selectedStepID === stepID) return;
    dispatch(updateStep({ stepID }));
  };

  const restoreWorkflowState = (workflow) => {
    dispatch(updateTotalWorkflow({ workflow }));
  };

  return {
    handleWorkflowChange,
    handleWFStepBlur,
    createWorkflowStep,
    deleteWorkflowStep,
    updateSelectedStep,
    restoreWorkflowState,
  };
};

export default useWorkflowForms;
