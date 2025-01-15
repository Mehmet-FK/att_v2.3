import css from "@/styles/entities.module.css";
import Accordion from "@/components/ui-components/Accordion";
import { MenuItem, TextField } from "@mui/material";
import Select from "@/components/form-elements/Select";
import ImageInput from "@/components/form-elements/ImageInput";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EntityAccordion = ({ entityForm, setEntityForm }) => {
  const [dataSource, setDataSource] = useState([]); //Keep the State from Store

  const { views } = useSelector((state) => state.attensam.data); // DataSource

  const handleChange = (e) => {
    setEntityForm({ ...entityForm, [e.target.name]: e.target.value });
  };

  // const handleImageOnChange = (e) => {
  //   const file = e.target.files[0] || null;
  //   setEntityForm({ ...entityForm, iconUrl: file });

  //   if (!file) {
  //     setEntityForm({ ...entityForm, iconUrl: null });
  //     return;
  //   }
  // };

  useEffect(() => {
    setDataSource(views);
  }, [views]);
  return (
    <Accordion expandDefault header={"ENTITIY"}>
      <div className={css.entityFormGroup}>
        <TextField
          sx={{ width: "100%" }}
          onChange={handleChange}
          value={entityForm?.name || ""}
          size="small"
          label="Name"
          name="name"
          variant="outlined"
          required
        />
        <TextField
          sx={{ width: "100%" }}
          onChange={handleChange}
          value={entityForm?.caption || ""}
          size="small"
          name="caption"
          label="Caption"
          variant="outlined"
          required
        />

        <Select
          label="DataSource"
          name="dataSource"
          width="100%"
          value={entityForm?.dataSource || ""}
          onChange={handleChange}
        >
          {dataSource?.map((opt, index) => (
            <MenuItem key={index} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>

        {/* <ImageInput
          name="iconUrl"
          img={
            entityForm?.IconUrl != undefined ? null : entityForm?.defaultIconPath
          }
           onChange={handleImageOnChange}
        /> */}
      </div>
    </Accordion>
  );
};

export default EntityAccordion;
