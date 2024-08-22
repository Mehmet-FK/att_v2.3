import css from "@/styles/table.module.css";
import TotalEntries from "./TotalEntries";
import Loading_Icon from "./Loading_Icon";
import Pagination from "./Pagination";
import DownloadCSV from "./DownloadCSV";
import { useRouter } from "next/router";

const TableUtilities = ({
  table,
  totalEntries,
  totalPages,
  paginationParams,
  loading,
  rawData,
}) => {
  const router = useRouter();
  let fileName = router.query.module;

  return (
    <div className={css.util_container}>
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
    </div>
  );
};

export default TableUtilities;
