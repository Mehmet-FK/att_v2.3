import ToolsDrawer from "@/components/workflow/drawers/ToolsDrawer";
import Sheet from "@/components/workflow";
import React, { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import { ReactFlowProvider } from "reactflow";

const Workflow = () => {
  const [viewTypes, setViewTypes] = useState({});
  const [launchTypes, setLaunchTypes] = useState({});
  const { getViewTypes, getLaunchTypes } = useAttensamCalls();

  const { viewTypes: views, launchTypes: launches } = useSelector(
    (state) => state.attensam.data
  );

  useEffect(() => {
    getViewTypes();
    getLaunchTypes();
  }, []);

  useEffect(() => {
    setViewTypes(views);
  }, [views]);

  useEffect(() => {
    setLaunchTypes(launches);
  }, [launches]);

  return (
    <ReactFlowProvider>
      <Sheet viewTypes={viewTypes} launchTypes={launches} />
    </ReactFlowProvider>
  );
};

export default Workflow;
