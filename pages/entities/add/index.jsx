import PageHeader from "@/components/PageHeader";
import styles from "@/styles/entities.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import EntityAccordion from "@/components/entities/EntityAccordion";
import FieldsAccordion from "@/components/entities/FieldsAccordion";
import { useSelector } from "react-redux";
import ToolMenu from "@/components/ToolMenu";
import ConfirmModal from "@/components/ConfirmModal";
import DeleteIcon from "@mui/icons-material/Delete";

const AddEntity = () => {
  const [entity, setEntity] = useState({});
  const [fields, setFields] = useState([]);

  const [openConfirm, setOpenConfirm] = useState({
    isOpen: false,
    isConfirmed: false,
  });

  const router = useRouter();
  const { query } = router;
  // Fetch functions from custom hook
  const {
    deleteEntityCall,
    deleteFieldCall,
    updateFieldCall,
    updateEntityCall,
    postEntityCall,
    postFieldCall,
    getViewColumnsCall,
    getSingleEntityCall,
    getViewsCall,
  } = useAttensamCalls();

  const { token } = useSelector((state) => state.userInfo); //Access Token
  const { entity: singleEntity } = useSelector((state) => state.attensam.data);

  //Confirm Dialog Props
  const confirmProps = {
    dialogTitle: "Title",
    dialogContent: "Lorem Ipsum",
    acceptBtnText: "Löschen",
    acceptFunc: () => setOpenConfirm({ ...openConfirm, isConfirmed: true }),
    isConfirmed: false,
  };

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
    const formData = new FormData();
    formData.append("Name", entity.name);
    formData.append("Caption", entity.caption);
    formData.append("Icon", entity.iconUrl);
    formData.append("DataSource", entity.dataSource);

    formData.append("Fields", JSON.stringify(fields));

    //Check if it is edit Entity or create Entity
    if (query.entityId) {
      handleUpdate(query.entityId, singleEntity?.fields, fields, formData);
    } else {
      postEntityCall(formData);
    }

    router.back();
  };

  useEffect(() => {
    if (!entity?.dataSource) return;
    getViewColumnsCall(entity.dataSource);
    console.log("viewColumns useEffect");
  }, [entity?.dataSource]);

  useEffect(() => {
    console.log(query?.entityId);
    if (token) {
      getViewsCall();
      if (query?.entityId) {
        getSingleEntityCall(query.entityId);
        console.log("getSingleEntityCall useEffect");
      }
    }
  }, [token]);

  useEffect(() => {
    if (query?.entityId) {
      setEntity(singleEntity);
      setFields(singleEntity?.fields);
      console.log("setEntity useEffect");
    }
  }, [singleEntity?.id]);

  return (
    <>
      <ConfirmModal
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirmProps={confirmProps}
      />

      <PageHeader title="Add Entity" />
      <div className={styles.container}>
        {""}
        {query.entityId && <ToolMenu buttonsList={toolMenuProps} />}
        {""}

        <EntityAccordion setEntity={setEntity} entity={entity} />
        <FieldsAccordion
          entity={entity}
          fields={fields}
          setFields={setFields}
        />
        <div className={styles.submitBtnWrapper}>
          <Button
            className={styles.submitBtn}
            onClick={handleSubmit}
            variant="contained"
          >
            submit
          </Button>
        </div>
      </div>
    </>
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
