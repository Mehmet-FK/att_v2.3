import { getSession } from "next-auth/react";
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {
      session,
    },
  };
};
