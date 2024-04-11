import styles from "@/styles/entities.module.css";
import UtilBar from "@/components/entities/UtilBar";
import PageHeader from "@/components/PageHeader";
import { useSelector } from "react-redux";
import EntityCard from "@/components/entities/EntityCard";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ConfirmModal from "@/components/ConfirmModal";

const Entities = () => {
  const { entities } = useSelector((state) => state.attensam.data);
  const { token } = useSelector((state) => state.userInfo);
  const { getEntitiesCall } = useAttensamCalls();

  const [existingEntities, setExistingEntities] = useState([]);

  useEffect(() => {
    if (token) {
      getEntitiesCall();
    }
    console.log("first");
  }, [token]);

  useEffect(() => {
    setExistingEntities(entities);
  }, [entities]);

  return (
    <>
      <PageHeader title="ENTITIES" />
      <div className={styles.container}>
        <UtilBar
          setExistingEntities={setExistingEntities}
          entities={entities}
        />
        <div className={styles.gridContainer}>
          {existingEntities?.map((entity) => (
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
