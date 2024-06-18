import {
  setCurrentPage,
  setFilterParams,
  setSearchTrigger,
  setSortType,
} from "@/redux/slices/tableUtilsSlice";
import { useDispatch } from "react-redux";

const useFilters = () => {
  const dispatch = useDispatch();

  const filterBookings = (filterVal) => {
    // let base = `https://pbsolutions.dev/atina/api/AtinaMobileBookings?`;
    let base = "";

    for (const key in filterVal) {
      if (!filterVal[key]) continue;

      if (key.includes("date")) {
        let edited = filterVal[key]
          .split(".")
          .reverse()
          .join("")
          .replaceAll(".", "");
        base += `&${key}=${edited}`;
      } else {
        base += `&${key}=${filterVal[key]}`;
      }
    }
    console.log(base);
    dispatch(setFilterParams({ params: base, table: "bookings" }));
    dispatch(setCurrentPage({ number: 1, table: "bookings" }));
  };

  const filterItems = (filterVal) => {
    let base = "";

    for (const key in filterVal) {
      if (!filterVal[key]) continue;

      if (key.includes("date")) {
        let edited = filterVal[key]
          .split(".")
          .reverse()
          .join("")
          .replaceAll(".", "");
        base += `&${key}=${edited}`;
      } else {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        base += `&${capitalizedKey}=${filterVal[key]}`;
      }
    }
    console.log(base);

    dispatch(setFilterParams({ params: base, table: "items" }));
    dispatch(setCurrentPage({ number: 1, table: "items" }));
  };

  const filterUsers = (filterVal) => {
    let base = "";
    for (const key in filterVal) {
      if (!filterVal[key]) continue;
      base += `&${key}=${filterVal[key]}`;
    }
    dispatch(setFilterParams({ params: base, table: "users" }));
    dispatch(setCurrentPage({ number: 1, table: "users" }));
  };

  const resetFilter = (table) => {
    dispatch(setFilterParams({ params: "", table }));
    dispatch(setSortType({ field: {}, table }));
  };

  return { filterBookings, filterItems, filterUsers, resetFilter };
};

export default useFilters;
