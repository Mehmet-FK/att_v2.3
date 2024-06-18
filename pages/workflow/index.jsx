import ToolsDrawer from "@/components/workflow/drawers/ToolsDrawer";
import Sheet from "@/components/workflow";
import React, { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import { getSession } from "next-auth/react";

const Workflow = () => {
  const { getViewTypes, getLaunchTypes } = useAttensamCalls();

  useEffect(() => {
    getViewTypes();
    getLaunchTypes();
  }, []);

  return (
    <>
      {/* <style>{selectedStyle}</style> */}
      <ReactFlowProvider>
        <Sheet />
      </ReactFlowProvider>
    </>
  );
};

export default Workflow;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
