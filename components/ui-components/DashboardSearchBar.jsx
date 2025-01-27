import SearchIcon from "@mui/icons-material/Search";
import css from "@/styles/dashboard-searchbar.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const DashboardSearchBar = ({
  itemsState,
  setItemsState,
  filterKeys,
  addNewLink,
  filter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  /* 
  const filterItems = (_itemsState) => {
    return _itemsState?.filter((el) => {
      const condition =
      filter?.value !== "" ? el[filter?.key] == filter?.value : true;
      
      return (
        condition &&
        el[filterKey].toLowerCase().includes(searchTerm.toLowerCase())
        );
        });
        };
        */

  const filterItems = (_itemsState, term) => {
    const lowerCaseSearchTerm = term.toLowerCase();

    if (!_itemsState) return;

    return _itemsState.filter((item) =>
      filterKeys.some((key) => {
        const value = item[key];

        return (
          value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
        );
      })
    );
  };

  const debouncedFilter = useCallback(
    debounce((term) => {
      const result = filterItems(itemsState, term);
      setItemsState(result);
    }, 300),
    [itemsState]
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedFilter(e.target.value);
  };
  return (
    <div className={css.utilbarContainer}>
      <div className={css.searchbarWrapper}>
        <span className={css.iconWrapper}>
          <SearchIcon />
        </span>
        <input
          value={searchTerm || ""}
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
