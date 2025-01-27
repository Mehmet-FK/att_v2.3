import DateInput from "@/components/form-elements/DateInput";
import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import { Badge, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/entities.module.css";
import CheckBox from "../workflow/forms/common-form-elements/CheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSelect from "../workflow/forms/common-form-elements/CustomSelect";

const EntitySortingSection = ({ fieldID }) => {
  const { entitySortings } = useSelector((state) => state.entity);
  const sortingRule = useMemo(
    () => entitySortings.find((rule) => rule.fieldId === fieldID),
    [entitySortings]
  );

  const [sortingRuleFormValues, setSortingRuleFormValues] = useState(
    sortingRule || {}
  );

  const { createEntitySorting, updateEntitySortingValue, deleteEntitySorting } =
    useEntityForm();

  const addOrDeleteEntitySorting = (e) => {
    if (sortingRule) {
      if (e.detail < 2) return;
      deleteEntitySorting(sortingRule.entitySortingId);
    } else {
      createEntitySorting(fieldID);
    }
  };

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setSortingRuleFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    updateEntitySortingValue(name, newValue, sortingRule.entitySortingId);
  };

  const sortingRulenExists = sortingRule ? true : false;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={
          sortingRulenExists ? (
            <DeleteIcon color="secondary" fontSize="small" />
          ) : (
            <AddBoxIcon color="primary" fontSize="small" />
          )
        }
        slotProps={{
          badge: {
            sx: {
              marginLeft: "10px",
              width: "1.7rem",
              height: "1.7rem",
              backgroundColor: "#ccc",
              cursor: "pointer",
            },
            onClick: addOrDeleteEntitySorting,
          },
        }}
        sx={{ width: "100%", height: "100%" }}
      >
        <Accordion
          sx={{ paddingBlock: 0, width: "100%" }}
          disabled={!sortingRulenExists}
          header={"Sortierungsregel"}
          headerProps={{ sx: { width: "100%" } }}
        >
          {sortingRulenExists && (
            <div className={css.flex_column}>
              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="Sort Order"
                name="sortOrder"
                value={sortingRuleFormValues.sortOrder}
                size="small"
                options={[
                  { key: 0, caption: "0" },
                  { key: 1, caption: "1" },
                ]}
                preferences={{ key: "key", caption: "caption" }}
              />
              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="Sort Direction"
                name="sortDirection"
                value={sortingRuleFormValues.sortDirection}
                size="small"
                options={[
                  { key: 0, caption: "Aufsteigend" },
                  { key: 1, caption: "Absteigend" },
                ]}
                preferences={{ key: "key", caption: "caption" }}
              />
            </div>
          )}
        </Accordion>
      </Badge>
    </div>
  );
};

export default EntitySortingSection;
