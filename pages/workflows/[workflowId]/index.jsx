import Sheet from "@/workflow-manager";
import React, { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import { useSelector } from "react-redux";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";

const WorkflowManager = () => {
  const entitiesRemote = useSelector((state) => state.attensam.data?.entities);
  const workflowsRemote = useSelector(
    (state) => state.attensam.data?.workflows
  );

  const {
    getWorkflowDefinitionsCall,
    getViewTypes,
    getLaunchTypes,
    getAllIconsCall,
    getEntitiesCall,
    getWorkflowsCall,
    getWorkflowHubsCall,
  } = useAttensamCalls();
  const { restoreWorkflowState, clearWorkflowState } = useWorkflowForms();
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
    if (router.query.workflowId === "new") {
      clearWorkflowState();
    } else {
      fetchWorkflowDefinition();
    }
  }, []);

  useEffect(() => {
    getViewTypes();
    getLaunchTypes();
    getAllIconsCall();
    getWorkflowHubsCall();
    if (!entitiesRemote) {
      getEntitiesCall();
    }
    if (!workflowsRemote) {
      getWorkflowsCall();
    }
  }, []);

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

export default WorkflowManager;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const isAtinaAdmin = session?.user?.userInfo?.userId === 5573;
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  } else if (!isAtinaAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {
        session,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
