import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const NoSSRTable = dynamic(() => import("@/components/phase-1/users/Table"), {
  ssr: false,
});

const Users = () => {
  return (
    <div className="page-wrapper">
      <Head>
        <title>Benutzer</title>
      </Head>
      <NoSSRTable />
    </div>
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
