import css from "@/styles/entity-styles/entities.module.css";

import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ElementBadge from "../../workflow/forms/common-form-elements/ElementBadge";
import { useEffect, useMemo, useState } from "react";
import ClipBoardInput from "./ClipboardInput";
import UserDefinedOption from "./UserDefinedOption";
import { useSelector } from "react-redux";
import { parseClipboardText } from "@/helpers/readTextFile";
import { entityFieldOptionTypes } from "@/helpers/Constants";

const FieldOptionsSection = ({
  fieldID,
  optionType,
  setConfirmModalValues,
}) => {
  const fieldOptions = useSelector((state) => state.entity.fieldOptions);
  const {
    generateRandomId,
    createFieldOption,
    createMultipleFieldOptions,
    updateFieldOptionValue,
    deleteFieldOption,
  } = useEntityForm();

  const filteredFieldOptions = useMemo(
    () => fieldOptions.filter((option) => option?.fieldId === fieldID),
    [fieldOptions]
  );

  const addFieldOption = (e) => {
    const template = {
      fieldOptionId: generateRandomId("field-option-", null),
      fieldId: fieldID,
      optionType: optionType,
      optionSource: null,
      optionSourceFilter: null,
      caption: "",
      value: "",
    };

    createFieldOption(template);
  };

  const openConfirmModaltoDeleteOption = (option) => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie das Feldoption "${
        option?.caption || option?.value
      }" löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteFieldOption(option.fieldOptionId),
    };
    setConfirmModalValues(temp);
  };

  const handlePasteOptions = async (e) => {
    const cells = await parseClipboardText(window, e);
    const newFieldOptions = [];
    if (cells.length < 0) return;
    cells.forEach((cell) => {
      const template = {
        fieldOptionId: generateRandomId("field-option-", null),
        fieldId: fieldID,
        optionType: optionType,
        optionSource: null,
        optionSourceFilter: null,
        caption: cell.caption,
        value: cell.value,
      };

      newFieldOptions.push(template);
    });
    console.log({ parsedCells: cells });

    createMultipleFieldOptions(newFieldOptions);
  };
  const isOptionTypeSelected = optionType !== undefined;
  const optionExists = filteredFieldOptions.length > 0;
  const accordionDisabled = !isOptionTypeSelected && !optionExists;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ElementBadge
        handleClickOnBadge={addFieldOption}
        badgeContent={<AddBoxIcon color="primary" fontSize="small" />}
        badgeSx={{ display: !isOptionTypeSelected && "none" }}
      >
        <Accordion
          accordionProps={{
            disabled: accordionDisabled,
          }}
          bodyProps={{
            sx: {
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
              position: "relative",
              minHeight: "200px",
            },
          }}
          header={"Feld Optionen"}
        >
          {optionType === entityFieldOptionTypes.USER_DEFINED ? (
            <>
              <ClipBoardInput handlePasteOptions={handlePasteOptions} />
              <div className={css.flex_wrap_row}>
                {filteredFieldOptions?.map((fieldOption) => (
                  <UserDefinedOption
                    key={fieldOption.fieldOptionId}
                    fieldOption={fieldOption}
                    deleteFieldOption={deleteFieldOption}
                    updateFieldOptionValue={updateFieldOptionValue}
                    openConfirmModaltoDeleteOption={
                      openConfirmModaltoDeleteOption
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <h2>In Bearbeitung...</h2>
          )}
        </Accordion>
      </ElementBadge>
    </div>
  );
};

export default FieldOptionsSection;
