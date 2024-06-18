import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useSelector } from "react-redux";
import useTable from "@/hooks/useTable";

const Pagination = ({ paginationParams, table, totalPages }) => {
  const [page, setPage] = useState({
    pageSize: 50,
    currentPage: 1,
  });

  const { handlePageSize, handlePreviousPage, handleNextPage, gotoPage } =
    useTable(table);

  const handleChange = (event) => {
    handlePageSize(Number(event.target.value));
    gotoPage(1);
  };

  //   useEffect(() => {
  //     console.log(paginationParams);
  //   }, [paginationParams]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: "15px",
        marginLeft: "5px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <span style={{ fontSize: "0.8rem" }}>Anzahl Zeilen</span>
        <FormControl
          variant="standard"
          sx={{ width: "55px", textAlign: "center" }}
        >
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={paginationParams?.pageSize || 25}
            onChange={handleChange}
          >
            <MenuItem defaultChecked value={25}>
              <span style={{ fontSize: "0.8rem" }}>25</span>
            </MenuItem>
            <MenuItem value={50}>
              <span style={{ fontSize: "0.8rem" }}>50</span>
            </MenuItem>
            <MenuItem value={100}>
              {" "}
              <span style={{ fontSize: "0.8rem" }}>100</span>
            </MenuItem>
            <MenuItem value={200}>
              {" "}
              <span style={{ fontSize: "0.8rem" }}>200</span>
            </MenuItem>
            <MenuItem value={500}>
              {" "}
              <span style={{ fontSize: "0.8rem" }}>500</span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <span style={{ fontSize: "0.8rem" }}>
        {paginationParams?.currentPage
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
        von {totalPages?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </span>
      <div>
        <IconButton
          onClick={() => gotoPage(1)}
          disabled={paginationParams?.currentPage === 1}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={() => handlePreviousPage()}
          disabled={paginationParams?.currentPage === 1}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => handleNextPage()}
          disabled={paginationParams?.currentPage >= totalPages}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          onClick={() => gotoPage(totalPages)}
          disabled={paginationParams?.currentPage >= totalPages}
        >
          <LastPageIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;
