import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/entity-styles/entities.module.css";
import { Card, CardContent, TextField } from "@mui/material";
import IconSelect from "@/components/form-elements/IconSelect";
import CustomSelect from "../../workflow/forms/common-form-elements/CustomSelect";
import ElementBadge from "../../workflow/forms/common-form-elements/ElementBadge";

const FieldProperty = ({ property, setConfirmModalValues }) => {
  const [propertyFormValues, setPropertyFormValues] = useState(property);

  const { updateFieldProperyValue, deleteFieldProperty } = useEntityForm();

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

  const handleDeleteFieldProperty = () => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie die Feldeigenschaft löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteFieldProperty(property.listViewPropertyId),
    };
    setConfirmModalValues(temp);
  };

  useEffect(() => {
    setPropertyFormValues(property);
  }, [property]);

  return (
    <ElementBadge
      handleClickOnBadge={handleDeleteFieldProperty}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      badgeSx={{
        marginRight: "10px",
        marginTop: "5px",
        width: "1.7rem",
        height: "1.7rem",
        backgroundColor: "#ccc",
        cursor: "pointer",
      }}
      containerSx={{ width: "auto", maxWidth: "100%", minWidth: "49%" }}
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
                value={propertyFormValues.priorityType || ""}
                size="small"
                options={[
                  { key: 0, caption: "Niedrig" },
                  { key: 1, caption: "Hoch" },
                ]}
                preferences={{ key: "key", caption: "caption" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </ElementBadge>
  );
};

const FieldPropertiesSection = ({ fieldID, setConfirmModalValues }) => {
  const { fieldProperties } = useSelector((state) => state.entity);

  const properties = useMemo(
    () => fieldProperties.filter((property) => property.fieldID === fieldID),
    [fieldProperties]
  );

  const { createFieldProperty } = useEntityForm();

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
      <ElementBadge
        handleClickOnBadge={addFieldProperty}
        badgeContent={<AddBoxIcon color="primary" fontSize="small" />}
      >
        <Accordion
          accordionProps={{
            disabled: !propertyExists,
          }}
          header={"Feld Eigenschaften"}
        >
          {propertyExists && (
            <div className={css.flex_wrap_row}>
              {properties?.map((property) => (
                <FieldProperty
                  key={property.listViewPropertyId}
                  property={property}
                  setConfirmModalValues={setConfirmModalValues}
                />
              ))}
            </div>
          )}
        </Accordion>
      </ElementBadge>
    </div>
  );
};

export default FieldPropertiesSection;
