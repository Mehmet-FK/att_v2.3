import SearchIcon from "@mui/icons-material/Search";
import styles from "@/styles/dashboard-searchbar.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardSearchBar = ({ state, setState, filterKey, addNewLink }) => {
  //State to controll searchbar value
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    //updates the entities everytime when the search value changes
    setState((prev) =>
      state?.filter((el) =>
        el[filterKey].toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  }, [searchVal]);

  return (
    <div className={styles.utilbarContainer}>
      <div className={styles.searchbarWrapper}>
        <span className={styles.iconWrapper}>
          <SearchIcon />
        </span>
        <input
          value={searchVal || ""}
          onChange={handleChange}
          type="text"
          className={styles.searchbar}
          placeholder="Suchbegriff eingeben"
        />
      </div>
      <Link href={addNewLink} className={styles.buttonWrapper}>
        <Button size="small" className={styles.button} variant="contained">
          Neu Anlegen
        </Button>
      </Link>
    </div>
  );
};

export default DashboardSearchBar;
