self.onmessage = (event) => {
  const workflows = event.data;

  // Function implementation
  const prepareWorkflowsForAutoCompleteSelect = (workflows) => {
    if (!workflows) return [];

    const potentialParentWorkflows = workflows.filter(
      (wf) => wf.launchType !== "0" && wf.launchType !== "1"
    );

    return potentialParentWorkflows.map((wf) => ({
      id: wf.id,
      caption: wf.caption,
      icon: wf.icon,
    }));
  };

  // Process workflows and send the result back
  const result = prepareWorkflowsForAutoCompleteSelect(workflows);
  self.postMessage(result);
};
