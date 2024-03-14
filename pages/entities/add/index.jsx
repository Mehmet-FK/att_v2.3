import Accordion from "@/components/Accordion";
import PageHeader from "@/components/PageHeader";
import styles from "@/styles/entities.module.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import FieldGroup from "@/components/entities/FieldGroup";
import { Button, MenuItem } from "@mui/material";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import ImageInput from "@/components/ImageInput";
import Select from "@/components/Select";
import { useSelector } from "react-redux";
import { toastWarnNotify } from "@/helpers/ToastNotify";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const AddEntity = () => {
  const [entity, setEntity] = useState({});
  const [fields, setFields] = useState([]);

  const router = useRouter();

  const { views } = useSelector((state) => state.attensam.data); // DataSource
  const { token } = useSelector((state) => state.userInfo); //Access Token

  const [dataSource, setDataSource] = useState([]); //Keep the State from Store

  // Fetch functions from custom hook
  const {
    createNewEntitCall,
    getViewsCall,
    getViewColumnsCall,
    getSingleEntityCall,
  } = useAttensamCalls();

  const handleImageOnChange = (e) => {
    const file = e.target.files[0] || null;
    setEntity({ ...entity, iconUrl: file });

    if (!file) {
      setEntity({ ...entity, iconUrl: null });
      return;
    }
  };

  // Input onchange function
  const handleChange = (e) => {
    setEntity({ ...entity, [e.target.name]: e.target.value });
  };

  /**
   * checks if dataSource (View) Value is empty. if empty does not add new field
   * because fieldGroups need dataSource value to make API Call for View columns
   */
  const addNewField = () => {
    if (!entity?.dataSource) {
      // if no dataSource selected yet
      toastWarnNotify("Zuerst das DataSource festlegen!");
      return;
    }

    const groupID = `id-${Math.random().toString(36).substr(2, 10)}`; // Id to determine current group in fields array
    const inx = fields.length;
    setFields([
      ...fields,
      {
        index: inx,
        id: groupID,
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
    formData.append("DataSource", entity.dataSource);

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

    //Fetch function to post new Entity on the Server
    createNewEntitCall(formData).then((isSuccess) => {
      if (isSuccess) {
        setEntity({});
        setFields([]);
      }
    });
    e.target.disabled = false;
  };

  useEffect(() => {
    if (!entity?.dataSource) return;
    getViewColumnsCall(entity.dataSource);
  }, [entity?.dataSource]);

  useEffect(() => {
    if (!token) return;
    getViewsCall();
  }, [token]);

  useEffect(() => {
    setDataSource(views);
  }, [views]);

  useEffect(() => {
    if (router.query.entityId) {
      getSingleEntityCall(router.query.entityId);
    }
  }, []);

  return (
    <>
      <PageHeader title="Add Entity" />
      <div className={styles.container}>
        <Accordion expandDefault header={"ENTITIY"}>
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
              // img={selectedImage}
              onChange={handleImageOnChange}
            />
          </div>
        </Accordion>
        <Accordion header={"FELDER"}>
          {fields?.map((field, index) => (
            <FieldGroup
              key={index}
              field={field}
              view={entity?.dataSource}
              setFields={setFields}
              removeField={removeField}
            />
          ))}

          <Button
            variant="outlined"
            size="small"
            sx={{ alignSelf: "flex-end", fontSize: 20 }}
            onClick={addNewField}
          >
            +
          </Button>
        </Accordion>

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
