import ToolsDrawer from "@/components/workflow/drawers/ToolsDrawer";
import Sheet from "@/components/workflow";
import React, { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import { ReactFlowProvider } from "reactflow";

const selectedStyle = `
.react-flow__node.selectable:focus {
  outline-offset: 5px;
  outline: 2px solid rgb(0, 149, 255);
  border: 2px solid rgb(0, 149, 255);
  border-radius: 0 !important;
}
.selected:active,
.selected:hover {
  border: none !important;
 
  outline: none !important;
}

`;

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
    <>
      {/* <style>{selectedStyle}</style> */}
      <ReactFlowProvider>
        <Sheet viewTypes={viewTypes} launchTypes={launches} />
      </ReactFlowProvider>
    </>
  );
};

export default Workflow;
