import css from "@/styles/entity-styles/entities.module.css";

import Accordion from "@/components/ui-components/Accordion";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import { Card, CardContent, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useSelector } from "react-redux";
import ElementBadge from "../../workflow/forms/common-form-elements/ElementBadge";
import { useEffect, useState } from "react";
import { parseClipboardText } from "@/helpers/readTextFile";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ClipBoardInput = () => {
  const [expandInput, setExpandInput] = useState(false);

  return (
    <div
      className={css.flex_row}
      style={{
        border: "1px solid red",
        justifyContent: "flex-end",
        alignItems: "start",
        maxHeight: expandInput ? "55rem" : "2.5rem",
        transition: "max-height 0.5s ease-in-out",
      }}
    >
      <textarea
        label="ClipboardContent"
        onPaste={(e) => parseClipboardText(window, e)}
        disabled={!expandInput}
        rows="15"
        style={{
          border: "none",
          outline: "none",
          width: expandInput ? "100%" : "2rem",
          height: "100%",
          opacity: expandInput ? "1" : "0",
          transition: "all 0.5s ease-in-out",
        }}
      />
      {/* <TextField
        variant="outlined"
        size="medium"
        label="ClipboardContent"
        onPaste={(e) => parseClipboardText(window, e)}
        fullWidth
        multiline
        rows={5}
        disabled={!expandInput}
        sx={{
          width: expandInput ? "100%" : "2rem",

          opacity: expandInput ? "1" : "0",
          transition: "all 0.5s ease-in-out",
        }}
      /> */}
      {!expandInput && (
        <IconButton onClick={() => setExpandInput(true)}>
          <ContentPasteIcon
            fontSize="smaller"
            // sx={{ marginRight: "-40px", marginTop: "-20px" }}
          />
        </IconButton>
      )}
      {expandInput && (
        <>
          <IconButton onClick={() => setExpandInput(false)}>
            <CloseIcon
              fontSize="smaller"
              // sx={{ marginRight: "-40px", marginTop: "-20px" }}
            />
          </IconButton>
        </>
      )}
    </div>
  );
};

const FieldOption = ({ fieldOption }) => {
  const [optionFormValues, setOptionFormValues] = useState(fieldOption);

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setOptionFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
  };

  useEffect(() => {
    setOptionFormValues(fieldOption);
  }, [fieldOption]);

  return (
    <ElementBadge
      handleClickOnBadge={() => null}
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
            <TextField
              size="small"
              label="caption"
              value={optionFormValues?.caption || ""}
              name="caption"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />

            <TextField
              size="small"
              label="value"
              value={optionFormValues?.value || ""}
              name="value"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </div>
        </CardContent>
      </Card>
    </ElementBadge>
  );
};

const FieldOptionsSection = ({ fieldID, setConfirmModalValues }) => {
  //   const { fieldOptions } = useSelector((state) => state.entity);

  const [fieldOptions, setFieldOptions] = useState([]);
  const { generateRandomId } = useEntityForm();

  //   const options = useMemo(
  //     () => fieldOptions.filter((option) => option.fieldID === fieldID),
  //     [fieldOptions]
  //   );

  const addFieldOption = (caption, value) => {
    const template = {
      fieldOptionId: generateRandomId("field-option-", null),
      fieldID: fieldID,
      caption: "",
      value: "",
    };

    setFieldOptions((prev) => [...prev, template]);
  };

  const handlePasteOptions = (e) => {
    // parseClipboardText(window, e);
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ElementBadge
        handleClickOnBadge={addFieldOption}
        badgeContent={<AddBoxIcon color="primary" fontSize="small" />}
        containerProps={{
          onPaste: handlePasteOptions,
        }}
      >
        <Accordion
          accordionProps={
            {
              // disabled: fieldOptions.length < 1,
            }
          }
          header={"Feld Optionen"}
        >
          <ClipBoardInput />

          <div className={css.flex_wrap_row}>
            {fieldOptions?.map((fieldOption) => (
              <FieldOption
                key={fieldOption.fieldOptionId}
                fieldOption={fieldOption}
              />
            ))}
          </div>
        </Accordion>
      </ElementBadge>
    </div>
  );
};

export default FieldOptionsSection;
