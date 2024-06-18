import Table from "@/components/table/Table";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

// const NoSSRTable = dynamic(() => import("@/components/table/Table"), {
const NoSSRTable = dynamic(
  () => import("@/components/test_generic_table/Table"),
  {
    ssr: false,
  }
);

const TableTest = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // padding: "2rem",
      }}
    >
      <NoSSRTable />
    </div>
  );
};

export default TableTest;
