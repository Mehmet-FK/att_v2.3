import css from "@/styles/dashboard-card.module.css";

import React, { useEffect, useState } from "react";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useSelector } from "react-redux";

import { getSession } from "next-auth/react";
import Card from "@/components/dashboard/Card";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";

const Workflow = () => {
  const [existingWorkflows, setExistingWorkflows] = useState([]);
  const { getViewTypes, getLaunchTypes, getEntitiesCall, getWorkflowsCall } =
    useAttensamCalls();
  const workflows = useSelector((state) => state.attensam.data?.workflows);

  useEffect(() => {
    getViewTypes();
    getLaunchTypes();
    getEntitiesCall();
    getWorkflowsCall();
  }, []);

  useEffect(() => {
    if (workflows) {
      setExistingWorkflows(workflows?.filter((wf) => wf.launchType === "2"));
    }
  }, [workflows]);

  return (
    <>
      <div className={css.container}>
        <DashboardSearchBar
          setState={setExistingWorkflows}
          state={workflows}
          filterKey="caption"
          addNewLink="/workflows/new"
        />
        <div className={css.gridContainer}>
          {existingWorkflows?.map((wf) => (
            <Card
              cardInfo={{
                url: `/workflows/${wf.id}`,
                caption: wf.caption,
                defaultIconUrl: wf.icon,
              }}
            />
          ))}
        </div>
      </div>
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
