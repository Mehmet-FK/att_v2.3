import dynamic from "next/dynamic";
import Head from "next/head";

const NoSSRTable = dynamic(() => import("@/components/phase-1/items/Table"), {
  ssr: false,
});

const MobileBookings = () => {
  return (
    <>
      <Head>
        <title>Datensätze</title>
      </Head>
      <NoSSRTable />
    </>
  );
};

export default MobileBookings;
