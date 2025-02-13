import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";

import css from "@/styles/dashboard-styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";
import PageHeader from "@/components/ui-components/PageHeader";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import DashboardSkeletonLoader from "@/components/ui-components/DashboardSkeletonLoader";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import DashboardFilterNavigation from "@/components/ui-components/DashboardFilterNavigation";
import { CustomSvgIcon } from "@/layout/layout_helpers";

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
  const [workflowLaunchType, setWorkflowLaunchType] = useState(0);

  const launchTypeFilterOptions = [
    {
      id: -1,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/workflow-fliter-show-all.svg"
          width="30px"
        />
      ),
      caption: "Alle anzeigen",
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
      id: 5,
      icon: (
        <CustomSvgIcon
          src="/assets/launch-type-icons/default-listview.svg"
          width="30px"
        />
      ),
      caption: "Default List View",
    },
  ];

  const filterByLaunchType = (value) => {
    if (value === -1) {
      setExistingWorkflows(workflows);
    } else {
      const temp = workflows?.filter(
        (wf) => parseInt(wf.launchType) === value || value === ""
      );
      setExistingWorkflows(temp);
    }
  };

  const moduleFilterOptions = useMemo(
    () => modules?.map((m) => m.caption),
    [modules]
  );

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
        <DashboardSearchBar
          itemsState={sortedWorkflows}
          filterOptions={moduleFilterOptions}
          setItemsState={setExistingWorkflows}
          filterKeys={["id", "caption", "path", "name"]}
          addNewLink="/workflows/new"
          filter={{ key: "launchType", value: workflowLaunchType }}
        />
        <DashboardFilterNavigation
          value={workflowLaunchType}
          setValue={setWorkflowLaunchType}
          filterOptions={launchTypeFilterOptions}
          handleFilter={filterByLaunchType}
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
