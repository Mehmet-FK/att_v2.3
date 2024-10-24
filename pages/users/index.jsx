import BookingsTable from "@/components/phase-1/bookings/Table";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const NoSSRTable = dynamic(() => import("@/components/phase-1/users/Table"), {
  ssr: false,
});

const Users = () => {
  return (
    <>
      <Head>
        <title>Benutzer</title>
      </Head>
      <NoSSRTable />
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
