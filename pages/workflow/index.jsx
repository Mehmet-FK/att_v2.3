import ToolsDrawer from "@/components/workflow/ToolsDrawer";
import Sheet from "@/components/workflow/Sheet";
import React, { useState } from "react";

const Workflow = () => {
  const [openToolsDrawer, setOpenToolsDrawer] = useState(false);
  const [flow, setFlow] = useState([]);

  return (
    <>
      {/* <h4
        style={{
          position: "absolute",
          top: 70,
          zIndex: 200,
          cursor: "pointer",
          backgroundColor: "#404040",
          padding: "6px 20px",
          borderRadius: "6px",
          color: "#fff",
          textAlign: "center",
        }}
        onClick={() => setOpenToolsDrawer((prev) => !prev)}
      >
        Sidebar {openToolsDrawer ? "schließen" : "öffnen"}
      </h4> */}
      <Sheet />
      {/* <ToolsDrawer open={openToolsDrawer} setOpen={setOpenToolsDrawer} /> */}
    </>
  );
};

export default Workflow;
