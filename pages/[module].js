import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Table = dynamic(() => import("@/components/phase-2/table/Table"), {
  ssr: false,
});

const Module = () => {
  const router = useRouter();
  const { data } = useSelector((state) => state.attensam);

  return (
    <>
      <Head>
        <title>{router.query.module}</title>
      </Head>
      <Table />
    </>
  );
};

export default Module;
