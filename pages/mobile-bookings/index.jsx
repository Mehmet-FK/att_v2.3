import BookingsTable from "@/components/phase-1/bookings/Table";
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
