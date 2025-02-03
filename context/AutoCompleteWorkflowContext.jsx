import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AutoCompleteWorkflowContext = createContext();

export const AutoCompleteWorkflowProvider = ({ children }) => {
  const [autoCompleteWorkflows, setAutoCompleteWorkflows] = useState([]);

  const workflows = useSelector((state) => state.attensam.data?.workflows);

  const [runWorker, workflowsFromWorker] = useAutoCompleteDataWorker(
    "/workers/prepareWorkflowsWorker.js"
  );

  useEffect(() => {
    if (workflows && !autoCompleteWorkflows.length) {
      runWorker(workflows);
    }
  }, [workflows]);

  useEffect(() => {
    if (workflowsFromWorker) {
      setAutoCompleteWorkflows(workflowsFromWorker);
    }
  }, [workflowsFromWorker]);

  const contextValue = { autoCompleteWorkflows };
  return (
    <AutoCompleteWorkflowContext.Provider value={contextValue}>
      {children}
    </AutoCompleteWorkflowContext.Provider>
  );
};

export const useAutoCompleteWorkflows = () => {
  return useContext(AutoCompleteWorkflowContext);
};
