import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";

import css from "@/styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";
import PageHeader from "@/components/ui-components/PageHeader";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import DashboardSkeletonLoader from "@/components/ui-components/DashboardSkeletonLoader";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import DashboardFilterNavigation from "@/components/ui-components/DashboardFilterNavigation";
import { CustomSvgIcon } from "@/layout/layout_helpers";

const Workflow = () => {
  const { getWorkflowsCall } = useAttensamCalls();
  const workflows = useSelector((state) => state.attensam.data?.workflows);
  const [existingWorkflows, setExistingWorkflows] = useState(workflows);
  const [workflowLaunchType, setWorkflowLaunchType] = useState("");

  const launchTypeFilterOptions = [
    {
      id: 0,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/dataset-function.svg"
          width="30px"
        />
      ),
      caption: "Dataset Function",
    },
    {
      id: 1,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/entity-function.svg"
          width="30px"
        />
      ),
      caption: "Entity Function",
    },
    {
      id: 2,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/module.svg"
          width="30px"
        />
      ),
      caption: "Module",
    },
    {
      id: 3,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/element-default-function.svg"
          width="30px"
        />
      ),
      caption: "Element Default Function",
    },
    {
      id: 4,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/group-view.svg"
          width="30px"
        />
      ),
      caption: "Group View",
    },
  ];

  const filterByLaunchType = (value) => {
    const temp = workflows?.filter(
      (wf) => parseInt(wf.launchType) === value || value === ""
    );

    setExistingWorkflows(temp);
  };

  const multiSortWorkflows = (array) => {
    return array.sort((a, b) => {
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

  useEffect(() => {
    if (workflows) return;
    getWorkflowsCall();
  }, []);

  const findParentWorkflowById = (workflowId) => {
    return workflows.find((wf) => {
      if (!wf.workflows) return undefined;
      return wf.workflows.includes(workflowId);
    });
  };

  useEffect(() => {
    if (workflows) {
      const tempWorkflows = workflows.map((wf) => {
        if (wf.launchType === "4") {
          return { ...wf, path: wf.caption };
        } else if (wf.launchType === "2") {
          const parentWF = findParentWorkflowById(wf.id);
          if (parentWF) {
            return {
              ...wf,
              path: parentWF.caption + ">" + wf.caption,
            };
          }
          return {
            ...wf,
            path: wf.caption,
          };
        } else if (wf.launchType === "0") {
          return {
            ...wf,
            path: "Record >" + wf.caption,
          };
        } else {
          return wf;
        }
      });
      setExistingWorkflows(multiSortWorkflows(tempWorkflows));
    }
  }, [workflows]);

  return (
    <div className="page-wrapper">
      <PageHeader title="WORKFLOWS" />
      <div className={css.container}>
        <DashboardSearchBar
          itemsState={workflows}
          setItemsState={setExistingWorkflows}
          filterKey="caption"
          addNewLink="/workflows/new"
          filter={{ key: "launchType", value: workflowLaunchType }}
        />
        <DashboardFilterNavigation
          value={workflowLaunchType}
          setValue={setWorkflowLaunchType}
          filterOptions={launchTypeFilterOptions}
          handleFilter={filterByLaunchType}
        />
        <DashboardSkeletonLoader />
        <div className={css.gridContainer}>
          {existingWorkflows?.map((wf) => (
            <Card
              cardInfo={{
                url: `/workflows/${wf.id}`,
                texts: [wf.path],
                caption: `${wf.id} - ${wf.caption}`,
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
