import BookingsTable from "@/components/phase-1/bookings/Table";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const NoSSRTable = dynamic(
  () => import("@/components/phase-1/bookings/Table"),
  {
    ssr: false,
  }
);

const MobileBookings = () => {
  return (
    <>
      <Head>
        <title>Mobile Buchungen</title>
      </Head>
      <NoSSRTable />
    </>
  );
};

export default MobileBookings;

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
