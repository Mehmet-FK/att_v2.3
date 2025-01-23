import DateInput from "@/components/form-elements/DateInput";
import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/entities.module.css";
import { Badge, Card, CardContent, TextField } from "@mui/material";
import IconSelect from "@/components/form-elements/IconSelect";
import CustomSelect from "../../workflow/forms/common-form-elements/CustomSelect";
import DeleteIcon from "@mui/icons-material/Delete";

const FieldProperty = ({ property }) => {
  const [propertyFormValues, setPropertyFormValues] = useState(property);

  const { updateFieldProperyValue, deleteFieldPropery } = useEntityForm();

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPropertyFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    updateFieldProperyValue(name, newValue, property.listViewPropertyId);
  };

  const deleteProperty = (e) => {
    if (e.detail < 2) return;
    deleteFieldPropery(property.listViewPropertyId);
  };

  useEffect(() => {
    setPropertyFormValues(property);
  }, [property]);

  return (
    <Badge
      badgeContent={<DeleteIcon color="secondary" />}
      slotProps={{
        badge: {
          sx: {
            marginRight: "10px",
            marginTop: "10px",
            width: "1.7rem",
            height: "1.7rem",
            backgroundColor: "#ccc",
            cursor: "pointer",
          },
          onClick: deleteProperty,
        },
      }}
      sx={{ maxWidth: "100%", minWidth: "49%" }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <div className={css.flex_column}>
            <div className={css.flex_row}>
              <TextField
                size="small"
                label="filterValue"
                value={propertyFormValues?.filterValue || ""}
                name="filterValue"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </div>
            <div className={css.flex_row}>
              <IconSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={propertyFormValues?.differingIcon || ""}
                name={"differingIcon"}
                size="small"
                label="differingIcon"
              />
              <IconSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={propertyFormValues?.differingListviewItemIcon || ""}
                name={"differingListviewItemIcon"}
                size="small"
                label="differingListviewItemIcon"
              />
            </div>
            <div className={css.flex_row}>
              <TextField
                size="small"
                label="priorityText"
                value={propertyFormValues?.priorityText || ""}
                name="priorityText"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />

              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="priorityType"
                name="priorityType"
                value={propertyFormValues.priorityType}
                size="small"
                options={[
                  { key: 0, caption: "Niedrig" },
                  { key: 1, caption: "Hoch" },
                ]}
                defaultValue={null}
                preferences={{ key: "key", caption: "caption" }}
              />
            </div>
          </div>
        </CardContent>{" "}
      </Card>
    </Badge>
  );
};

const FieldPropertiesSection = ({ fieldID }) => {
  const { fieldProperties } = useSelector((state) => state.entity);

  const properties = useMemo(
    () => fieldProperties.filter((property) => property.fieldID === fieldID),
    [fieldProperties]
  );

  const { createFieldProperty, updateFieldProperyValue, deleteFieldPropery } =
    useEntityForm();

  const addFieldProperty = () => {
    createFieldProperty(fieldID);
  };

  const propertyExists = properties?.length > 0 ? true : false;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={<AddBoxIcon color="primary" fontSize="small" />}
        slotProps={{
          badge: {
            sx: {
              marginLeft: "10px",
              width: "1.7rem",
              height: "1.7rem",
              backgroundColor: "#ccc",
              cursor: "pointer",
            },
            onClick: addFieldProperty,
          },
        }}
        sx={{ width: "100%" }}
      >
        <Accordion
          sx={{ paddingBlock: 0, width: "100%" }}
          disabled={!propertyExists}
          header={"Feld Eigenschaften"}
        >
          <div className={css.flex_wrap_row}>
            {propertyExists &&
              properties?.map((property) => (
                <FieldProperty property={property} />
              ))}
          </div>
        </Accordion>{" "}
      </Badge>
    </div>
  );
};

export default FieldPropertiesSection;
