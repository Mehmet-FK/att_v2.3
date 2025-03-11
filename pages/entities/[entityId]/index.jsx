import PageHeader from "@/components/ui-components/PageHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import EntityForm from "@/components/phase-2/entities";
import { useSelector } from "react-redux";

const Entity = () => {
  const router = useRouter();
  const entityId = router.query?.entityId;

  const entities = useSelector((state) => state.attensam.data?.entities);

  const { getEntityDefinitionsCall, getEntitiesCall, getAllIconsCall } =
    useAttensamCalls();

  const { clearEntityDefinition } = useEntityForm();

  const [fetchedEntity, setFetchedEntity] = useState(null);

  const fetchEntityDefinition = async () => {
    if (entityId !== "new") {
      try {
        const response = await getEntityDefinitionsCall(entityId);
        setFetchedEntity(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (entityId === "new") {
      clearEntityDefinition();
    } else {
      fetchEntityDefinition(entityId);
    }
  }, [entityId]);

  useEffect(() => {
    getAllIconsCall();
    getEntitiesCall();
  }, []);

  return (
    <div className="page-wrapper">
      {/* <form> */}
      <PageHeader
        title={`Entität ${fetchedEntity === "new" ? "Anlegen" : "Bearbeiten"}`}
      />
      <EntityForm existingEntity={fetchedEntity} />
      {/* </form> */}
    </div>
  );
};

export default Entity;

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
