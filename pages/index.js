import Head from "next/head";
import { getSession } from "next-auth/react";
import css from "@/styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Attensam</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={css.container}>
        <div className={css.gridContainer}>
          <Card
            cardInfo={{
              url: "/mobile-bookings",
              caption: "Mobile Buchungen",
              defaultIconUrl: "/assets/dashboard-icons/bookings.svg",
            }}
          />
          <Card
            cardInfo={{
              url: "/items",

              caption: "Datensätze",
              defaultIconUrl: "/assets/dashboard-icons/items.svg",
            }}
          />
          <Card
            cardInfo={{
              url: "/users",

              caption: "Benutzer",
              defaultIconUrl: "/assets/dashboard-icons/users.svg",
            }}
          />
          <Card
            cardInfo={{
              url: "/workflows",

              caption: "Workflows",
              defaultIconUrl: "/assets/dashboard-icons/workflows.svg",
            }}
          />
          <Card
            cardInfo={{
              url: "/entities",

              caption: "Entitäten",
              defaultIconUrl: "/assets/dashboard-icons/entities.svg",
            }}
          />
        </div>
      </div>
    </>
  );
}
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
