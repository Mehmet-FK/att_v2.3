import common_css from "@/styles/common-style.module.css";
import css from "@/styles/dashboard-styles/dashboard-searchbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
const FILTER_TYPE = "search";
const DashboardSearchBar = ({
  itemsState,
  setItemsState,
  filterKeys,
  addNewLink,
  updateQueryParam,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterItems = (_itemsState, term) => {
    const lowerCaseSearchTerm = term.toLowerCase();

    if (!_itemsState) return;
    return _itemsState.filter((item) =>
      filterKeys.some((key) => {
        const value = item[key];
        return (
          value &&
          value
            .toString()
            .toLowerCase()
            .replaceAll("/", " ")
            .includes(lowerCaseSearchTerm)
        );
      })
    );
  };

  const debouncedFilter = useCallback(
    debounce((term) => {
      const result = filterItems(itemsState, term);
      updateQueryParam(FILTER_TYPE, term);
      setItemsState(result);
    }, 300),
    [itemsState]
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedFilter(e.target.value);
  };

  const router = useRouter();
  useEffect(() => {
    if (router.isReady && !isLoading) {
      const query = router.query.search;
      if (query !== undefined) {
        setSearchTerm(query);
        const result = filterItems(itemsState, query);
        setItemsState(result);
      }
    }
  }, [router.isReady, router.query, isLoading]);

  return (
    <div className={common_css.flex_column} style={{ rowGap: "0px" }}>
      <div className={css.utilbarContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            debouncedFilter(searchTerm);
          }}
          className={css.searchbarWrapper}
        >
          <span className={css.iconWrapper}>
            <SearchIcon />
          </span>
          <input
            value={searchTerm || ""}
            onChange={handleChange}
            type="text"
            className={css.searchbar}
            placeholder="Suchbegriff eingeben"
            name="searchbar"
            autoFocus={true}
          />
        </form>
        <Link href={addNewLink} className={css.buttonWrapper}>
          <Button size="small" className={css.button} variant="contained">
            Neu Anlegen
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSearchBar;
