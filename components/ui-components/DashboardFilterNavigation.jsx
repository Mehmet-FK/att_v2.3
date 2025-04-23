import css from "@/styles/dashboard-styles/filter-navigation.module.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FILTER_TYPE = "launchType";
const DEFAULT_OPTION = -1;
const DEFAULT_VALUE = 0;
const DashboardFilterNavigation = ({
  itemsState,
  setItemsState,
  filterNavigations,
  updateQueryParam,
  isLoading,
}) => {
  const [value, setValue] = useState(0);

  const router = useRouter();

  const handleFilter = (value) => {
    if (value === -1) {
      setItemsState(itemsState);
    } else {
      const temp = itemsState?.filter(
        (item) => parseInt(item.launchType) === value || value === ""
      );
      setItemsState(temp);
    }
  };

  const handleChange = (option) => {
    handleFilter(option.id);
    updateQueryParam(FILTER_TYPE, option.id);
  };

  const getInitialValue = (query) => {
    if (query !== undefined) {
      return filterNavigations.findIndex((opt) => opt.id === parseInt(query));
    }
    return DEFAULT_VALUE;
  };

  useEffect(() => {
    if (router.isReady && !isLoading) {
      const query = router.query.launchType;

      if (query !== undefined) {
        const initValue = getInitialValue(query);
        setValue(initValue);
        handleFilter(parseInt(query));
      } else {
        setValue(DEFAULT_VALUE);
      }
    }
  }, [router.isReady, router.query, isLoading]);

  return (
    <Box className={css.container}>
      <BottomNavigation
        showLabels
        value={value}
        className={css.navigation_wrapper}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        {filterNavigations.map((nav) => (
          <BottomNavigationAction
            key={nav.id}
            onClick={() => handleChange(nav)}
            label={nav.caption}
            icon={nav.icon}
            className={css.navigation_element}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.6em",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default DashboardFilterNavigation;
