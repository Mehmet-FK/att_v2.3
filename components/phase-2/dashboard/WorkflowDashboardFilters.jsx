import DashboardFilterNavigation from "@/components/ui-components/DashboardFilterNavigation";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import { useEffect, useMemo, useState } from "react";
import DashboardModuleFilter from "./DashboardModuleFilter";
import { CustomSvgIcon } from "@/layout/layout_helpers";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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
  const isLoading = useSelector((state) => state.attensam.loading);
  const router = useRouter();
  const updateQueryParam = (filterType, param) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { [filterType]: param },
      },
      undefined,
      { shallow: true },
    );
  };

  const moduleFilterOptions = useMemo(
    () =>
      modules?.map((m) => ({
        id: m.id,
        name: m.name,
        caption: m.caption,
        icon: m.icon,
        workflows: m.workflows,
      })),
    [modules],
  );

  return (
    <>
      <DashboardFilterNavigation
        itemsState={sortedWorkflows}
        setItemsState={setExistingWorkflows}
        filterNavigations={launchTypeFilterOptions}
        updateQueryParam={updateQueryParam}
        isLoading={isLoading}
      />
      <DashboardSearchBar
        itemsState={sortedWorkflows}
        setItemsState={setExistingWorkflows}
        filterKeys={["id", "caption", "path", "name"]}
        addNewLink="/workflows/new"
        updateQueryParam={updateQueryParam}
        isLoading={isLoading}
      />
      <DashboardModuleFilter
        moduleFilterOptions={moduleFilterOptions}
        itemsState={sortedWorkflows}
        setItemsState={setExistingWorkflows}
        updateQueryParam={updateQueryParam}
        isLoading={isLoading}
      />
    </>
  );
};

export default WorkflowDashboardFilters;
