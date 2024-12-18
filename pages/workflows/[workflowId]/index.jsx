import Sheet from "@/components/phase-2/workflow";
import React, { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { ReactFlowProvider } from "reactflow";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
// import useWorkflow from "@/hooks/workflow-hooks/useWorkflow";

const WorkflowTool = () => {
  const { getWorkflowDefinitionsCall } = useAttensamCalls();
  const { restoreWorkflowState } = useWorkflowForms();
  //   const { restoreExistingRemoteWorkflow } = useWorkflow();
  const [fetchedWorkflow, setFetchedWorkflow] = useState(null);
  const router = useRouter();

  const fetchWorkflowDefinition = async () => {
    const workflowId = router.query.workflowId;
    if (workflowId) {
      try {
        const response = await getWorkflowDefinitionsCall(workflowId);
        setFetchedWorkflow(response);
        restoreWorkflowState(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (router.query.workflowId !== "new") {
      fetchWorkflowDefinition();
    }
  }, [router.query.workflowId]);
  return (
    <>
      <Head>
        <title>{router.query.workflowId}</title>
      </Head>
      <ReactFlowProvider>
        <Sheet existingWorkflow={fetchedWorkflow} />
      </ReactFlowProvider>
    </>
  );
};

export default WorkflowTool;

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
