import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Divider } from "@mui/material";

const DashboardFilterNavigation = ({
  value,
  setValue,
  filterOptions,
  handleFilter,
}) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          // showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleFilter(newValue);
          }}
        >
          {filterOptions.map((opt) => (
            <BottomNavigationAction
              key={opt.id}
              label={opt.caption}
              icon={opt.icon}
              sx={{
                padding: "0px",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.6em",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
      <Divider />
    </>
  );
};

export default DashboardFilterNavigation;
