import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";

import css from "@/styles/dashboard-styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";
import PageHeader from "@/components/ui-components/PageHeader";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import DashboardSkeletonLoader from "@/components/ui-components/DashboardSkeletonLoader";
import { useRouter } from "next/router";

const Entities = () => {
  const entities = useSelector((state) => state.attensam.data?.entities);
  const { getEntitiesCall, getFieldTypes, getViewsCall } = useAttensamCalls();
  const isLoading = useSelector((state) => state.attensam.loading);

  const [existingEntities, setExistingEntities] = useState([]);

  const router = useRouter();
  const updateQueryParam = (filterType, param) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { [filterType]: param },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!entities) {
      getEntitiesCall();
    }
    getFieldTypes();
    getViewsCall();
  }, []);

  useEffect(() => {
    if (entities) {
      setExistingEntities(entities);
    }
  }, [entities]);

  return (
    <div className="page-wrapper">
      <PageHeader title="ENTITÄTEN" />
      <div className={css.container}>
        <DashboardSearchBar
          itemsState={entities}
          setItemsState={setExistingEntities}
          filterKeys={["id", "name", "caption"]}
          addNewLink="/entities/new"
          updateQueryParam={updateQueryParam}
          isLoading={isLoading}
        />
        <div className={css.gridContainer}>
          {existingEntities?.map((entity) => (
            <Card
              key={entity.id}
              cardInfo={{
                url: `/entities/${entity.id}`,
                caption: `${entity.id} - ${entity.caption}`,
                defaultIconUrl: entity.defaultIconPath,
              }}
              additionalTitles={[entity?.name]}
            />
          ))}
        </div>
        <DashboardSkeletonLoader />
      </div>
    </div>
  );
};

export default Entities;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const isAtinaAdmin = session?.user?.userInfo?.userId === 5573;
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  } else if (!isAtinaAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {
        session,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
