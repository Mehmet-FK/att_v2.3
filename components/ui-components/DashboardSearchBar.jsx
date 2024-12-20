import SearchIcon from "@mui/icons-material/Search";
import css from "@/styles/dashboard-searchbar.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardSearchBar = ({
  itemsState,
  setItemsState,
  filterKey,
  addNewLink,
  filter,
}) => {
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const filterItems = (_itemsState) => {
    return _itemsState?.filter((el) => {
      const condition =
        filter?.value !== "" ? el[filter?.key] == filter?.value : true;

      return (
        condition &&
        el[filterKey].toLowerCase().includes(searchVal.toLowerCase())
      );
    });
  };

  useEffect(() => {
    //updates the entities everytime when the search value changes //
    setItemsState((prev) => filterItems(itemsState));
  }, [searchVal]);

  return (
    <div className={css.utilbarContainer}>
      <div className={css.searchbarWrapper}>
        <span className={css.iconWrapper}>
          <SearchIcon />
        </span>
        <input
          value={searchVal || ""}
          onChange={handleChange}
          type="text"
          className={css.searchbar}
          placeholder="Suchbegriff eingeben"
        />
      </div>
      <Link href={addNewLink} className={css.buttonWrapper}>
        <Button size="small" className={css.button} variant="contained">
          Neu Anlegen
        </Button>
      </Link>
    </div>
  );
};

export default DashboardSearchBar;
