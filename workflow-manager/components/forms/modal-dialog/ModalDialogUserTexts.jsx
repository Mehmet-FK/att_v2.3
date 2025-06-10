import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import Accordion from "@/components/ui-components/Accordion";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import React, { useState } from "react";
import ConditionalTextForm from "./ConditionalTextForm";
import { Button } from "@mui/material";
import ModalDialogUserText from "@/workflow-manager/models/modal-dialog/ModalDialogUserText";

const ModalDialogUserTextOptions = ({
  userTextoptions,
  modalDialogId,
  updateModalDialogValue,
  entityFields,
}) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const [userTextOptionValues, setUserTextOptionValues] =
    useState(userTextoptions);

  const openConfirmModalToDelete = (userTextOptionID) => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie das Text Element löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => handleDeleteUserTextOption(userTextOptionID),
    };
    setConfirmModalValues(temp);
  };

  const handleDeleteUserTextOption = (textOptionID) => {
    const filteredTextOptions = userTextOptionValues.filter(
      (field) => field.modalDialogUserTextId !== textOptionID
    );
    updateModalDialogValue("userTexts", filteredTextOptions, modalDialogId);
    setUserTextOptionValues(filteredTextOptions);
  };

  const handleAddTextOption = () => {
    const newText = new ModalDialogUserText({}).toObject();
    const newTextOptions = [...userTextOptionValues, newText];

    updateModalDialogValue("userTexts", newTextOptions, modalDialogId);
    setUserTextOptionValues((prev) => [...prev, newText]);
  };

  const handleChange = (e, textOptionID) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setUserTextOptionValues((prev) =>
      prev.map((textOption) => {
        if (textOption.modalDialogUserTextId === textOptionID) {
          return { ...textOption, [name]: newValue };
        } else {
          return textOption;
        }
      })
    );
  };

  const handleBlur = () => {
    updateModalDialogValue("userTexts", userTextOptionValues, modalDialogId);
  };

  return (
    <>
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />

      <Accordion
        accordionProps={{
          sx: { paddingBlock: 0, width: "100%" },
        }}
        headerProps={{ sx: { fontSize: "smaller" } }}
        header={"Bedingte Informationstexte"}
      >
        <div className={css.flex_column}>
          <div
            className={css.flex_row}
            style={{ flexWrap: "wrap", rowGap: "10px" }}
          >
            {userTextOptionValues.map((textOption) => (
              <ConditionalTextForm
                key={textOption?.modalDialogUserTextId}
                textOptionValues={textOption}
                handleChange={handleChange}
                handleBlur={handleBlur}
                openConfirmModalToDelete={openConfirmModalToDelete}
                entityFields={entityFields}
              />
            ))}
          </div>
          <Button variant="contained" onClick={handleAddTextOption}>
            Benutzertext Option Anlegen
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default ModalDialogUserTextOptions;
