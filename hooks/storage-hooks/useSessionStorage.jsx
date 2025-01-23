const useSessionStorage = () => {
  const WORKFOW_SESSION = "workflow-session";

  const isWorkflowSessionExisting = () => {
    const sessionValue = sessionStorage.getItem(WORKFOW_SESSION);
    return sessionValue !== null;
  };

  const setSessionFlagForWorkflow = () => {
    sessionStorage.setItem(WORKFOW_SESSION, "wf-session");
    console.log("set Session");
  };

  return {
    isWorkflowSessionExisting,
    setSessionFlagForWorkflow,
  };
};

export default useSessionStorage;
