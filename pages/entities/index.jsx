import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";

import css from "@/styles/dashboard-styles/dashboard-card.module.css";
import Card from "@/components/ui-components/DashboardCard";
import PageHeader from "@/components/ui-components/PageHeader";
import DashboardSearchBar from "@/components/ui-components/DashboardSearchBar";
import DashboardSkeletonLoader from "@/components/ui-components/DashboardSkeletonLoader";

const Entities = () => {
  const entities = useSelector((state) => state.attensam.data?.entities);
  const { getEntitiesCall, getFieldTypes, getViewsCall } = useAttensamCalls();

  const [existingEntities, setExistingEntities] = useState([]);

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
          filterKeys={["caption"]}
          addNewLink="/entities/new"
        />
        <DashboardSkeletonLoader />
        <div className={css.gridContainer}>
          {existingEntities?.map((entity) => (
            <Card
              cardInfo={{
                url: `/entities/${entity.id}`,
                caption: `${entity.id} - ${entity.caption}`,
                defaultIconUrl: entity.defaultIconPath,
              }}
              additionalTitles={[entity?.name]}
              key={entity.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entities;

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
    props: {
      session,
    },
  };
};
