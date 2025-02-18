import css from "@/styles/dashboard-styles/filter-navigation.module.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const FILTER_TYPE = "navigation-filter";
const DEFAULT_OPTION = -1;
const DEFAULT_VALUE = 0;
const DashboardFilterNavigation = ({
  value,
  setValue,
  filterNavigations,
  handleFilter,
  setFilterType,
  filterType,
}) => {
  const resetFilterState = () => {
    if (!setFilterType) return;

    if (value !== DEFAULT_VALUE) {
      console.log("resetFilterStates(NAVIGATION);");
      setValue(DEFAULT_VALUE);
    }
  };

  if (filterType !== FILTER_TYPE) {
    resetFilterState();
  }

  const handleChange = (option) => {
    handleFilter(option.id);

    if (!setFilterType) return;

    if (filterType !== FILTER_TYPE) {
      setFilterType(FILTER_TYPE);
    }
  };
  return (
    <Box className={css.container}>
      <BottomNavigation
        showLabels
        value={value}
        className={css.navigation_wrapper}
        onChange={(event, newValue) => {
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
