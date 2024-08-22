import styles from "@/styles/entities.module.css";
import PageHeader from "@/components/others/PageHeader";
import { useSelector } from "react-redux";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ConfirmModal from "@/components/others/ConfirmModal";
import UtilBar from "@/components/phase-2/entities/UtilBar";
import EntitiesSkeleton from "@/components/phase-2/entities/EntitiesSkeleton";
import EntityCard from "@/components/phase-2/entities/EntityCard";

const Entities = () => {
  const { entities } = useSelector((state) => state.attensam.data);
  const { user } = useSelector((state) => state.settings);
  const { getEntitiesCall, getFieldTypes, getViewsCall } = useAttensamCalls();

  const [existingEntities, setExistingEntities] = useState([]);

  useEffect(() => {
    if (!user?.token) return;
    getEntitiesCall();
    getFieldTypes();
    getViewsCall();
  }, [user]);

  useEffect(() => {
    setExistingEntities(entities);
  }, [entities]);

  return (
    <>
      <PageHeader title="ENTITÄTEN" />
      <div className={styles.container}>
        <UtilBar
          setExistingEntities={setExistingEntities}
          entities={entities}
        />
        <div className={styles.gridContainer}>
          {!entities && <EntitiesSkeleton />}
          {entities &&
            existingEntities?.map((entity) => (
              <EntityCard cardInfo={entity} key={entity.id} />
            ))}
        </div>
      </div>
    </>
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
