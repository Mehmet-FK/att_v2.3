self.onmessage = (event) => {
  const workflows = event.data;

  // Function implementation
  const prepareWorkflowsForAutoCompleteSelect = (workflows) => {
    if (!workflows) return [];

    return workflows.map((wf) => ({
      id: wf.id,
      caption: wf.caption,
      name: wf.name || "",
      path: wf.path,
      icon: wf.icon,
    }));
  };

  // Process workflows and send the result back
  const result = prepareWorkflowsForAutoCompleteSelect(workflows);
  self.postMessage(result);
};
