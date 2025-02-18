import common_css from "@/styles/common-style.module.css";
import { Divider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const OptionCard = ({ optionValues, handleOptionClick, styles }) => {
  return (
    <span
      onClick={() => handleOptionClick(optionValues)}
      style={{
        minHeight: "2rem",
        paddingInline: "8px",
        backgroundColor: "#ccc5",
        border: "1px solid #3335",
        fontSize: "0.6em",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...styles,
      }}
    >
      {optionValues.caption}
    </span>
  );
};
const FILTER_TYPE = "module-filter";
const DashboardModuleFilter = ({
  moduleFilterOptions,
  itemsState,
  setItemsState,
  setFilterType,
  filterType,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const getSubWorkflows = (selectedModule) => {
    const workflowIDs = selectedModule.workflows
      ? selectedModule.workflows.filter((wfID) => wfID !== selectedModule.id)
      : [];

    const subworkflows = itemsState.filter((item) =>
      workflowIDs.includes(item.id)
    );
    return subworkflows;
  };

  const optionsToSelect = useMemo(() => {
    if (selectedOptions.length > 0) {
      const lastSelected = selectedOptions[selectedOptions.length - 1];
      return getSubWorkflows(lastSelected);
    }
    return moduleFilterOptions || [];
  }, [selectedOptions, moduleFilterOptions]);

  const resetFilterStates = () => {
    if (!setFilterType) return;

    if (selectedOptions.length > 0) {
      console.log("resetFilterStates(MODULE);");
      setSelectedOptions([]);
    }
  };

  const filterWorkflowsByPath = (options) => {
    const path = options.map((opt) => opt.caption).join("/");
    const filteredItems = itemsState.filter((item) => item.path.includes(path));
    setItemsState(filteredItems);
    return filteredItems;
  };

  const handleOptionSelect = (option) => {
    const optionsUpdated = selectedOptions.concat(option);
    setSelectedOptions(optionsUpdated);
    filterWorkflowsByPath(optionsUpdated);

    if (!setFilterType) return;

    if (filterType !== FILTER_TYPE) {
      setFilterType(FILTER_TYPE);
    }
  };

  const handleOptionRemove = (option) => {
    const indexOfSelected = selectedOptions.findIndex(
      (element) => element.id === option.id
    );
    let optionsUpdated = [];

    if (indexOfSelected !== 0) {
      optionsUpdated = selectedOptions.slice(0, indexOfSelected);
    }
    setSelectedOptions(optionsUpdated);
    filterWorkflowsByPath(optionsUpdated);
  };

  if (filterType !== FILTER_TYPE) {
    resetFilterStates();
  }

  return (
    <div
      className={common_css.flex_row}
      style={{ columnGap: "1rem", minHeight: "2rem" }}
    >
      {selectedOptions.length > 0 && (
        <>
          <div
            className={common_css.flex_wrap_row}
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {selectedOptions.map((soption) => (
              <OptionCard
                key={`${soption.id}-${soption.caption}`}
                handleOptionClick={handleOptionRemove}
                optionValues={soption}
                styles={{ backgroundColor: "#1976d250" }}
              />
            ))}
          </div>
          <Divider orientation="vertical" variant="fullWidth" flexItem />
        </>
      )}

      <div
        className={common_css.flex_wrap_row}
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {optionsToSelect?.map((foption) => (
          <OptionCard
            key={`${foption.id}-${foption.caption}`}
            handleOptionClick={handleOptionSelect}
            optionValues={foption}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardModuleFilter;
