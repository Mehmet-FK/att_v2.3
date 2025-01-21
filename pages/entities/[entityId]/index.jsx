import PageHeader from "@/components/ui-components/PageHeader";
import css from "@/styles/entities.module.css";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";

import EntityAccordion from "@/components/phase-2/entities/EntityAccordion";
import FieldsAccordion from "@/components/phase-2/entities/FieldsAccordion";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import EntityForm from "@/components/phase-2/entities";

const entityTemplate = {
  entityId: "new",
  name: "",
  caption: " Measurements",
  dataSource: "",
  dataSourceType: 0,
  isSystemEntity: false,
  fileSource: "",
  maxResults: null,
  defaultIconPath: null,
  entityFields: [],
  sortingDefinitions: [],
};

const entityFieldTemplate = {
  fieldId: "new-field",
  entityId: "3",
  linkedEntityId: "",
  name: "Number",
  caption: "Nummer",
  type: 0,
  dataSourceColumn: "Number",
  showMobile: true,
  validationId: "",
  isReadOnly: true,
  maxLength: null,
  decimalPlaces: null,
  showByDefault: true,
  groupName: "Allgemein",
};

const Entity = () => {
  const router = useRouter();
  const {
    query: { entityId },
  } = router;
  const { entities } = useSelector((state) => state.attensam.data);

  const { getEntityDefinitionsCall } = useAttensamCalls();

  const { clearEntityDefinition } = useEntityForm();

  const [runWorker, entitiesForAutoSelect] = useAutoCompleteDataWorker(
    "/workers/prepareEntitiesWorker.js"
  );

  const [fetchedEntity, setFetchedEntity] = useState(null);

  const entity = {};
  const [entityForm, setEntityForm] = useState(entity);

  const fetchEntityDefinition = async () => {
    const entityID = router.query.entityId;
    if (entityID) {
      try {
        const response = await getEntityDefinitionsCall(entityID);
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

  useEffect;

  useEffect(() => {
    if (entities) {
      runWorker(entities);
    }
  }, [entities]);

  return (
    <div className="page-wrapper">
      <form>
        <PageHeader
          title={`Entität ${
            fetchedEntity === "new" ? "Anlegen" : "Bearbeiten"
          }`}
        />

        <EntityForm existingEntity={fetchedEntity} />

        {/* <div className={css.container}>
          <EntityAccordion
            setEntityForm={setEntityForm}
            entityForm={entityForm}
          />
          <FieldsAccordion
            entityForm={entityForm}
            setEntityForm={setEntityForm}
            entitiesForAutoSelect={entitiesForAutoSelect}
          />
          <div className={css.submitBtnWrapper}>
            <Button className={css.submitBtn} variant="contained" type="submit">
              submit
            </Button>
          </div>
        </div> */}
      </form>
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
