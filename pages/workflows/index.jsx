import React, { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";

import css from "@/styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";
import PageHeader from "@/components/ui-components/PageHeader";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import DashboardSkeletonLoader from "@/components/ui-components/DashboardSkeletonLoader";

const Workflow = () => {
  const { getWorkflowsCall } = useAttensamCalls();
  const workflows = useSelector((state) => state.attensam.data?.workflows);
  const [existingWorkflows, setExistingWorkflows] = useState(workflows);

  useEffect(() => {
    if (workflows) return;
    getWorkflowsCall();
  }, []);

  useEffect(() => {
    if (workflows) {
      setExistingWorkflows(workflows?.filter((wf) => wf.launchType === "2"));
    }
  }, [workflows]);

  return (
    <div className="page-wrapper">
      <PageHeader title="WORKFLOWS" />
      <div className={css.container}>
        <DashboardSearchBar
          setState={setExistingWorkflows}
          state={workflows}
          filterKey="caption"
          addNewLink="/workflows/new"
        />
        <DashboardSkeletonLoader />
        <div className={css.gridContainer}>
          {existingWorkflows?.map((wf) => (
            <Card
              cardInfo={{
                url: `/workflows/${wf.id}`,
                caption: wf.caption,
                defaultIconUrl: wf.icon,
              }}
              key={wf.id}
            />
          ))}
        </div>
      </div>
    </div>
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
