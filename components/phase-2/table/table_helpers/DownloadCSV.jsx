"use client";

import React, { useEffect, useRef, useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";
import useAxios from "@/hooks/remote-api-hooks/useAxios";
import { useSelector } from "react-redux";
import { moduleTableCSV } from "@/helpers/DownloadCsvFunctions";

const DownloadCSV = ({ rawData, fileName, type, table }) => {
  const date = new Date().toJSON().slice(0, 10).replaceAll("-", "");
  const [url, setUrl] = useState("");

  const { axiosTableDataPhase2 } = useAxios();

  const { filterParams } = useSelector(
    (state) => state.tableUtils[table] || state.tableUtils.tableTemplate
  );
  const downloadRef = useRef(null);

  const fields = Object.values(rawData?.fields || {}).filter(
    (f) => f?.isVisible
  );

  const convertJsonToCsv = () => {
    let res = moduleTableCSV(rawData?.entries, fields);
    let headers = res.h;
    let main = res.m;

    const csv = [headers, ...main].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    setUrl(url);

    // downloadRef.current?.click();
  };
  const getFilteredData = async () => {
    let url = "";

    url = "api/";

    try {
      axiosTableDataPhase2(url + filterParams).then((res) => {
        convertJsonToCsv(res?.data?.entries);
      });
      // convertJsonToCsv(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (url) {
      downloadRef.current?.click();
    }
    setUrl("");
  }, [url]);

  return (
    <>
      {rawData && (
        <Tooltip
          title="CSV Datei Herunterladen"
          arrow
          sx={{ display: "flex", alignItems: "center" }}
          // onClick={() => rawData && convertJsonToCsv()}
        >
          <IconButton
            onClick={(e) => {
              if (filterParams) getFilteredData();
              else rawData && convertJsonToCsv();
            }}
          >
            <DownloadForOfflineIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      <a
        ref={downloadRef}
        href={url}
        download={`${date + "_" + fileName}.csv`}
        style={{
          color: "#888",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",

          position: "absolute",
          left: 20,
        }}
      ></a>
    </>
  );
};

export default DownloadCSV;
