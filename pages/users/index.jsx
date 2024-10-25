import UsersTable from "@/components/phase-1/users/Table";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";

const NoSSRTable = dynamic(() => import("@/components/phase-1/users/Table"), {
  ssr: false,
});

const Users = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Benutzer</title>
      </Head>
      {/* <NoSSRTable /> */}
      {isClient && <UsersTable />}
    </>
  );
};

export default Users;

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
