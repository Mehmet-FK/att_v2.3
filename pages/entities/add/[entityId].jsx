import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import styles from "@/styles/entities.module.css";
import Accordion from "@/components/Accordion";
import { Button, TextField } from "@mui/material";
import ImageInput from "@/components/ImageInput";
import { useEffect, useState } from "react";
import FieldGroup from "@/components/entities/FieldGroup";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import { useSelector } from "react-redux";
import Select from "@/components/Select";
import { getSession } from "next-auth/react";

const EntityDetail = () => {
  const router = useRouter();
  const entityId = router.query.entityId;
  const [selectedImage, setSelectedImage] = useState("");
  const [entity, setEntity] = useState({});
  const [fields, setFields] = useState([]);

  const [dataSource, setDataSource] = useState([]);
  const { entity: entityInfo } = useSelector((state) => state.attensam.data);

  const { getSingleEntity } = useAttensamCalls();

  const handleImageOnChange = (e) => {
    const file = e.target.files[0] || null;
    setEntity({ ...entity, iconUrl: file });
    setSelectedImage(file);
    if (!file) {
      setSelectedImage(null);
      setEntity({ ...entity, iconUrl: null });
      return;
    }
  };
  const handleChange = (e) => {
    setEntity({ ...entity, [e.target.name]: e.target.value });
  };
  const addNewField = () => {
    if (!entity?.dataSource) {
      toastWarnNotify("Zuerst das DataSource festlegen!");
      return;
    }

    const groupID = `id-${Math.random().toString(36).substr(2, 10)}`;
    const inx = fields.length;
    setFields([
      ...fields,
      {
        index: inx,
        id: groupID,
        name: "",
        caption: "",
        length: "",
        type: "",
        showByDefault: false,
      },
    ]);
  };
  const removeField = (id) => {
    const filtered = fields.filter((f) => f.id !== id);
    setFields(filtered);
  };

  const handleSubmit = (e) => {
    e.target.disabled = true;
    const formData = new FormData();
    formData.append("Name", entity.name);
    formData.append("Caption", entity.caption);
    formData.append("Icon", entity.iconUrl);

    const editedFields = fields.map((f) => {
      return {
        name: f.name,
        caption: f.caption,
        type: f.type,
        dataSourceColumn: f.dataSourceColumn,
        showByDefault: f.showByDefault,
      };
    });
    formData.append("Fields", JSON.stringify(editedFields));
    createNewEntity(formData);
    e.target.disabled = false;
  };

  useEffect(() => {
    getSingleEntity(entityId);
    setEntity(entityInfo);
    console.log(entityInfo);
  }, [entityId]);

  return (
    <>
      <PageHeader title={"Edit " + entityId} />

      <div className={styles.container}>
        <Accordion header={"ENTITIY"}>
          <div className={styles.entityFormGroup}>
            <TextField
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={entity?.name || ""}
              size="small"
              label="Name"
              name="name"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={entity?.caption || ""}
              size="small"
              name="caption"
              label="Caption"
              variant="outlined"
            />

            <Select
              label="DataSource"
              name="dataSource"
              width="100%"
              value={entity?.dataSource}
              onChange={handleChange}
              disabled={fields.length}
            >
              {dataSource?.map((opt, index) => (
                <MenuItem key={index} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>

            <ImageInput
              name="iconUrl"
              img={selectedImage}
              onChange={handleImageOnChange}
            />
          </div>
        </Accordion>
        <Accordion header={"FELDER"}>
          {fields?.map((field, index) => (
            <FieldGroup
              key={index}
              field={field}
              setFields={setFields}
              removeField={removeField}
            />
          ))}

          <Button
            variant="outlined"
            size="small"
            sx={{
              alignSelf: "flex-end",
              fontSize: 20,
              padding: 0,
              height: "2rem",
            }}
            onClick={addNewField}
          >
            +
          </Button>
        </Accordion>

        <div className={styles.submitBtnWrapper}>
          <Button onClick={handleSubmit} variant="contained">
            submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default EntityDetail;
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
