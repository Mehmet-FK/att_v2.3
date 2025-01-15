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
  const [entityForm, setEntityForm] = useState(entityTemplate);
  const router = useRouter();
  const {
    query: { entityId },
  } = router;
  const { entity: singleEntity, entities } = useSelector(
    (state) => state.attensam.data
  );

  const [runWorker, entitiesForAutoSelect, error, loading] =
    useAutoCompleteDataWorker("/workers/prepareEntitiesWorker.js");

  const {
    deleteEntityCall,
    deleteFieldCall,
    updateFieldCall,
    updateEntityCall,
    postEntityCall,
    postFieldCall,
    getViewColumnsCall,
    getSingleEntityCall,
    getFieldTypes,
  } = useAttensamCalls();

  const findEntityById = () => {
    const entity = entities?.find((entity) => entity.id === parseInt(entityId));
    if (!entity) {
      return entityTemplate;
    }
    return entity;
  };

  const entity = useMemo(() => findEntityById(), [entityId, entities]);

  //ToolMenu Buttonlist
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

  const handleUpdate = (entityId, fieldsBase, fieldsEdited, formData) => {
    const fieldsToPost = [];
    const fieldsToPut = [];
    const fieldsToDelete = [];

    // Find in UI edited or created Fields and push them into the right Array
    fieldsEdited.forEach((item, i) => {
      const baseElement = fieldsBase.find((el) => el.id === item.id);
      if (!baseElement) {
        // Check if element is new created
        fieldsToPost.push(item);
      } else {
        const isEqual = JSON.stringify(baseElement) === JSON.stringify(item);
        if (!isEqual) {
          // Check if elements are same or altered
          fieldsToPut.push(item);
        }
      }
    });

    //Find in UI deleted elements and push them into fieldsToDelete Array
    fieldsBase.forEach((item) => {
      const editedElement = fieldsEdited.find((el) => el.id === item.id);
      if (!editedElement) {
        fieldsToDelete.push(item);
      }
    });

    //POST FIELDS
    fieldsToPost.forEach((item) => {
      const fieldForm = new FormData();
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          fieldForm.append(`${key}`, value);
        }
      }
      postFieldCall(entityId, fieldForm);
    });

    //PUT FIELDS
    fieldsToPut.forEach((item) => {
      const fieldForm = new FormData();
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          fieldForm.append(`${key}`, value);
        }
      }
      updateFieldCall(item.id, fieldForm);
    });

    //DELETE FIELDS
    fieldsToDelete.forEach((item) => {
      deleteFieldCall(item.id);
    });

    //UPDATE ENTITY
    const uptData = formData;
    uptData.delete("fields");
    updateEntityCall(entityId, uptData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("Name", entity.name);
    formData.append("Caption", entity.caption);
    formData.append("Icon", entity.iconUrl);
    formData.append("DataSource", entity.dataSource);

    formData.append("Fields", JSON.stringify(fields));

    //Check if it is edit Entity or create Entity
    if (entityId) {
      handleUpdate(entityId, singleEntity?.fields, fields, formData);
    } else {
      postEntityCall(formData);
    }

    router.push("/entities");
  };

  useEffect(() => {
    setEntityForm(entity);
    getViewColumnsCall(entity?.dataSource);
  }, [entityId]);

  useEffect(() => {
    if (entities) {
      runWorker(entities);
    }
  }, [entities]);

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit}>
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
