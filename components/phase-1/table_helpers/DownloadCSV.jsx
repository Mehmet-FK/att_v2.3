"use client";

import React, { useEffect, useRef, useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";
import {
  bookingsTableCSV,
  itemsTableCSV,
  nfcTableCSV,
  sqlTableCSV,
  userTableCSV,
} from "@/helpers/DownloadCsvFunctions";
import useAxios from "@/hooks/remote-api-hooks/useAxios";
import { useSelector } from "react-redux";
import { tableNameConstants } from "@/helpers/Constants";

const DownloadCSV = ({ rawData, fileName, type, table }) => {
  const date = new Date().toJSON().slice(0, 10).replaceAll("-", "");
  const [url, setUrl] = useState("");
  const { axiosTableDataPhase1 } = useAxios();
  const { filterParams } = useSelector(
    (state) => state.tableUtils[table] || state.tableUtils.tableTemplate
  );
  const downloadRef = useRef(null);
  const convertJsonToCsv = (fltrData) => {
    let headers;
    let main;
    let res;
    switch (fileName) {
      case "benutzer":
        res = userTableCSV(fltrData || rawData);
        headers = res.h;
        main = res.m;

        break;
      case "mobile_buchungen":
        res = bookingsTableCSV(fltrData || rawData);
        headers = res.h;
        main = res.m;
        break;
      case "nfc_tags":
        res = nfcTableCSV(fltrData || rawData);
        headers = res.h;
        main = res.m;
        break;
      case "items":
        res = itemsTableCSV(rawData, type);

        headers = res.h;
        main = res.m;
        break;
      // case "protokolle":
      //   res = protocolTableCSV(rawData, type);

      //   headers = res.h;
      //   main = res.m;
      //   break;
      case "SQL_Abfrage":
        res = sqlTableCSV(rawData);

        headers = res.h;
        main = res.m;
        break;

      default:
        return;
    }
    const csv = [headers, ...main].join("\n");
    const blob = new Blob([csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    setUrl(url);

    // downloadRef.current?.click();
  };
  const getFilteredData = async () => {
    let url = "";
    if (table === tableNameConstants.USERS) {
      url = "AtinaUsers?showPagination=true&pageNumber=1&pageSize=10000";
    } else if (table === tableNameConstants.BOOKINGS) {
      url =
        "api/AtinaMobileBookings?showPagination=true&pageNumber=1&pageSize=10000";
    } else if (table === tableNameConstants.ITEMS) {
      url =
        "api/AtinaItems/SearchByKeyValue?onlyWithTagId=false&showPagination=true&pageNumber=1&pageSize=10000";
    } else if (table === "protocol") {
      url = "api/AtinaProtocol?showPagination=true&pageNumber=1&pageSize=10000";
    }

    try {
      axiosTableDataPhase1(url + filterParams).then((res) => {
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
