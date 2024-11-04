import css from "@/styles/table.module.css";
import TotalEntries from "./TotalEntries";
import Loading_Icon from "./Loading_Icon";
import Pagination from "./Pagination";
import DownloadCSV from "./DownloadCSV";
import { tableNameConstants } from "@/helpers/Constants";

const TableUtilities = ({
  table,
  totalEntries,
  totalPages,
  paginationParams,
  loading,
  rawData,
}) => {
  let fileName = "";
  if (table === tableNameConstants.USERS) fileName = "benutzer";
  else if (table === tableNameConstants.BOOKINGS) fileName = "mobile_buchungen";
  else if (table === tableNameConstants.ITEMS) fileName = "datensaetze";

  return (
    <span className={css.util_container}>
      <TotalEntries totalEntries={totalEntries} />
      <div style={{ display: "flex" }}>
        {loading && <Loading_Icon />}

        <Pagination
          paginationParams={paginationParams}
          totalPages={totalPages}
          table={table}
        />
        <DownloadCSV rawData={rawData} fileName={fileName} table={table} />
      </div>
    </span>
  );
};

export default TableUtilities;
