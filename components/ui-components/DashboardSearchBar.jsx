import common_css from "@/styles/common-style.module.css";
import css from "@/styles/dashboard-styles/dashboard-searchbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";

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
  filterOptions,
  filter,
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
      // console.log({ searchResult: result });
      setItemsState(result);
    }, 300),
    [itemsState]
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedFilter(e.target.value);
  };
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
          />
        </form>
        <Link href={addNewLink} className={css.buttonWrapper}>
          <Button size="small" className={css.button} variant="contained">
            Neu Anlegen
          </Button>
        </Link>
      </div>

      <div
        className={common_css.flex_wrap_row}
        style={{
          gap: "5px",
          justifyContent: "flex-start",
        }}
      >
        {filterOptions?.map((foption) => (
          <span
            style={{
              padding: "3px",
              backgroundColor: "#ccc5",
              border: "1px solid #3335",
              fontSize: "0.6em",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleChange({ target: { value: foption } })}
          >
            {foption}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DashboardSearchBar;
