import DashboardFilterNavigation from "@/components/ui-components/DashboardFilterNavigation";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import { useMemo, useState } from "react";
import DashboardModuleFilter from "./DashboardModuleFilter";
import { CustomSvgIcon } from "@/layout/layout_helpers";

const launchTypeFilterOptions = [
  {
    id: -1,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/workflow-fliter-show-all.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Alle anzeigen",
  },
  {
    id: 4,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/group-view.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Group View",
  },
  {
    id: 2,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/module.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Module",
  },
  {
    id: 0,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/dataset-function.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Dataset Function",
  },
  {
    id: 1,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/entity-function.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Entity Function",
  },

  {
    id: 3,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/element-default-function.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Element Default Function",
  },

  {
    id: 5,
    icon: (
      <CustomSvgIcon
        src="/assets/launch-type-icons/default-listview.svg"
        styles={{
          width: "30px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ),
    caption: "Default List View",
  },
];

const WorkflowDashboardFilters = ({
  setExistingWorkflows,
  modules,
  sortedWorkflows,
}) => {
  const [workflowLaunchType, setWorkflowLaunchType] = useState(0);
  const [filterType, setFilterType] = useState(null);

  const filterByLaunchType = (value) => {
    if (value === -1) {
      setExistingWorkflows(sortedWorkflows);
    } else {
      const temp = sortedWorkflows?.filter(
        (wf) => parseInt(wf.launchType) === value || value === ""
      );
      setExistingWorkflows(temp);
    }
  };

  const moduleFilterOptions = useMemo(
    () =>
      modules?.map((m) => ({
        id: m.id,
        name: m.name,
        caption: m.caption,
        workflows: m.workflows,
      })),
    [modules]
  );

  return (
    <>
      <DashboardFilterNavigation
        value={workflowLaunchType}
        setValue={setWorkflowLaunchType}
        filterNavigations={launchTypeFilterOptions}
        handleFilter={filterByLaunchType}
        setFilterType={setFilterType}
        filterType={filterType}
      />
      <DashboardSearchBar
        itemsState={sortedWorkflows}
        setItemsState={setExistingWorkflows}
        filterKeys={["id", "caption", "path", "name"]}
        addNewLink="/workflows/new"
        filter={{ key: "launchType", value: workflowLaunchType }}
        setFilterType={setFilterType}
        filterType={filterType}
      />
      <DashboardModuleFilter
        moduleFilterOptions={moduleFilterOptions}
        itemsState={sortedWorkflows}
        setItemsState={setExistingWorkflows}
        setFilterType={setFilterType}
        filterType={filterType}
      />
    </>
  );
};

export default WorkflowDashboardFilters;
