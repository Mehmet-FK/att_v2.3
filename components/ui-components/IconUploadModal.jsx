import css from "@/styles/workflow-forms-styles/icon-upload-modal.module.css";
import { Button, Card, CardContent, Modal, TextField } from "@mui/material";
import ImageInput from "../form-elements/ImageInput";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { useEffect, useId, useState } from "react";
import { toastWarnNotify } from "@/helpers/ToastNotify";

const initialIconValues = {
  IconSourceId: "new_icon_id",
  Filecaption: "",
  File: null,
};

const IconUploadModal = ({ open, setOpen }) => {
  const [iconFormData, setIconFormData] = useState(initialIconValues);

  const { uploadNewIconCall } = useAttensamCalls();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let inputValue = value;
    let fileProperties = {};
    if (type === "file" && files.length > 0) {
      inputValue = files[0];
      const imageUrl = URL.createObjectURL(inputValue);
      const Filecaption = inputValue?.name;
      fileProperties = { imageUrl, Filecaption };
    }

    setIconFormData({
      ...iconFormData,
      ...fileProperties,
      [name]: inputValue,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setIconFormData(initialIconValues);
  };
  const inputId = useId();

  const handleSubmit = () => {
    if (!iconFormData.File) {
      toastWarnNotify("Bitte ein Icon hochladen");
      return;
    }

    const uploadFormData = new FormData();
    for (const key in iconFormData) {
      uploadFormData.append(key, iconFormData[key]);
    }

    uploadNewIconCall(uploadFormData);
  };

  useEffect(() => {
    return () => {
      if (iconFormData.File) {
        URL.revokeObjectURL(iconFormData.File);
      }
    };
  }, [iconFormData.File]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className={css.card}>
        <CardContent className={css.content}>
          <div
            className={css.flex_column}
            style={{ justifyContent: "space-between", height: "100%" }}
          >
            <div className={css.flex_column}>
              <ImageInput
                id={inputId}
                name="File"
                value={iconFormData?.imageUrl}
                onChange={handleChange}
              />
              <TextField
                onChange={handleChange}
                value={iconFormData?.Filecaption || ""}
                variant="outlined"
                size="medium"
                label="Icon Beschriftung"
                name="Filecaption"
                fullWidth
                style={{ userSelect: "none" }}
              />
            </div>
            <Button variant="contained" onClick={handleSubmit}>
              Icon hochladen
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default IconUploadModal;
