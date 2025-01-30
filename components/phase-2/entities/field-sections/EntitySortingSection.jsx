import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/entity-styles/entities.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSelect from "../../workflow/forms/common-form-elements/CustomSelect";
import ElementBadge from "../../workflow/forms/common-form-elements/ElementBadge";

const EntitySortingSection = ({ fieldID, setConfirmModalValues }) => {
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

  const handleDeleteEntitySorting = () => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie den Sortierungsregel löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteEntitySorting(sortingRule.entitySortingId),
    };
    setConfirmModalValues(temp);
  };

  const addOrDeleteEntitySorting = (e) => {
    if (sortingRule) {
      handleDeleteEntitySorting();
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

  const sortingRuleExists = sortingRule ? true : false;

  const entitySortingsForSelect = useMemo(
    () =>
      entitySortings?.map((es, index) => ({
        key: index,
        caption: JSON.stringify(index),
      })),
    [entitySortings]
  );

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ElementBadge
        handleClickOnBadge={addOrDeleteEntitySorting}
        badgeContent={
          sortingRuleExists ? (
            <DeleteIcon color="secondary" fontSize="small" />
          ) : (
            <AddBoxIcon color="primary" fontSize="small" />
          )
        }
      >
        <Accordion
          accordionProps={{
            sx: { paddingBlock: 0, width: "100%" },
            disabled: !sortingRuleExists,
          }}
          header={"Sortierungsregel"}
        >
          {sortingRuleExists && (
            <div className={css.flex_column}>
              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                label="Sort Order"
                name="sortOrder"
                value={sortingRuleFormValues.sortOrder}
                size="small"
                options={entitySortingsForSelect}
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
      </ElementBadge>
    </div>
  );
};

export default EntitySortingSection;
