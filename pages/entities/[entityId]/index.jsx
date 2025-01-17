import PageHeader from "@/components/ui-components/PageHeader";
import css from "@/styles/entities.module.css";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import ToolMenu from "@/components/menus/ToolMenu";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityAccordion from "@/components/phase-2/entities/EntityAccordion";
import FieldsAccordion from "@/components/phase-2/entities/FieldsAccordion";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";

const entityTemplate = {
  name: "",
  caption: "",
  dataSource: "",
  dataSourceType: 0,
  isSystemEntity: false,
  fileSource: "",
  maxResults: null,
  defaultIconPath: null,
  fields: [],
  sortingDefinitions: [],
};

const AddEntity = () => {
  const router = useRouter();
  const {
    query: { entityId },
  } = router;
  const { entities } = useSelector((state) => state.attensam.data);

  const {
    deleteEntityCall,

    getViewColumnsCall,
  } = useAttensamCalls();
  const [runWorker, entitiesForAutoSelect] = useAutoCompleteDataWorker(
    "/workers/prepareEntitiesWorker.js"
  );

  const findEntityById = () => {
    const entity = entities?.find((entity) => entity.id === parseInt(entityId));
    if (!entity) {
      return entityTemplate;
    }
    return entity;
  };

  const entity = useMemo(() => findEntityById(), [entityId, entities]);
  const [entityForm, setEntityForm] = useState(entity);

  const toolMenuProps = [
    {
      icon: <DeleteIcon />,
      onClick: () => {
        setOpenConfirm(true);
        deleteEntityCall(query?.entityId).then(() => router.push("/entities"));
      },
      buttonText: "Löschen",
    },
  ];

  useEffect(() => {
    if (entityForm?.dataSource) {
      getViewColumnsCall(entityForm?.dataSource);
    }
  }, [entityForm?.dataSource]);

  useEffect(() => {
    if (entities) {
      runWorker(entities);
    }
  }, [entities]);

  return (
    <div className="page-wrapper">
      <form>
        <PageHeader
          title={`Entität ${entity?.id ? "Bearbeiten" : "Anlegen"}`}
        />
        <div className={css.container}>
          {entityId && <ToolMenu buttonsList={toolMenuProps} />}

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
        </div>
      </form>
    </div>
  );
};

export default AddEntity;

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
