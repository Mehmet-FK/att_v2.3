import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import css from "@/styles/dashboard-styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";
import PageHeader from "@/components/ui-components/PageHeader";
import DashboardSkeletonLoader from "@/components/ui-components/DashboardSkeletonLoader";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import WorkflowDashboardFilters from "@/components/phase-2/dashboard/WorkflowDashboardFilters";

const multiSortWorkflows = (array) => {
  const tmpArray = [...array];
  return tmpArray.sort((a, b) => {
    // Compare by 'path' first
    if (a.path < b.path) return -1;
    if (a.path > b.path) return 1;

    // If 'path' is the same, compare by 'caption'
    if (a.caption < b.caption) return -1;
    if (a.caption > b.caption) return 1;

    // If both are the same, return 0
    return 0;
  });
};

const Workflow = () => {
  const { getWorkflowsCall, getModulesCall } = useAttensamCalls();
  const workflows = useSelector((state) => state.attensam.data?.workflows);
  const modules = useSelector((state) => state.attensam.data?.modules);

  const sortedWorkflows = useMemo(() => {
    return workflows ? multiSortWorkflows(workflows) : [];
  }, [workflows]);

  const [existingWorkflows, setExistingWorkflows] = useState(sortedWorkflows);

  useEffect(() => {
    // if (workflows) return;
    getWorkflowsCall();
    getModulesCall();
  }, []);

  useEffect(() => {
    if (workflows) {
      setExistingWorkflows(multiSortWorkflows(workflows));
    }
  }, [workflows]);

  return (
    <div className="page-wrapper">
      <PageHeader title="WORKFLOWS" />
      <div className={css.container}>
        <WorkflowDashboardFilters
          modules={modules}
          sortedWorkflows={sortedWorkflows}
          setExistingWorkflows={setExistingWorkflows}
        />
        <div className={css.gridContainer}>
          {existingWorkflows?.map((wf, index) => (
            <Card
              key={`${wf.id}-${index}`}
              cardInfo={{
                url: `/workflows/${wf.id}`,
                texts: wf.path.split("/"),
                caption: `${wf.id} - ${wf.caption}`,
                defaultIconUrl: wf.icon,
              }}
              additionalTitles={[wf.name]}
            />
          ))}
        </div>
        <DashboardSkeletonLoader />
      </div>
    </div>
  );
};

export default Workflow;

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
