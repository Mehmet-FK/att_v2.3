import ItemsTable from "@/components/phase-1/items/Table";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";

const NoSSRTable = dynamic(() => import("@/components/phase-1/items/Table"), {
  ssr: false,
});

const Items = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Datensätze</title>
      </Head>
      {/* <NoSSRTable /> */}
      {isClient && <ItemsTable />}
    </>
  );
};

export default Items;

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
    props: { session },
  };
};
