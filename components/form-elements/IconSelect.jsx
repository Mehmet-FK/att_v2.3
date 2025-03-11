import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import IconUploadModal from "../ui-components/IconUploadModal";

const IconSelect = ({
  handleChange,
  handleBlur,
  name,
  value,
  label,
  fullWidth,
  showUpload,
  helperProps,
}) => {
  const icons = useSelector((state) => state.attensam.data?.icons || []);
  const [openIconUploadModal, setOpenIconUploadModal] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const optKey = "iconSourceId";
  const optCaption = "filecaption";
  const optTitle = "filecaption";
  const optImage = "url";
  const optFilterKeys = ["iconSourceId", "filename", "filecaption", "url"];

  const isSizeSmall = helperProps?.size === "small";

  const handleChangeLocal = (newValue) => {
    const pseudoEvent = {
      target: {
        name: name,
        value: null,
        type: "auto-complete",
        checked: false,
      },
    };
    if (newValue) {
      pseudoEvent.target.value = newValue[optKey];
    }
    handleChange(pseudoEvent);
  };

  const handleBlurLocal = () => {
    const pseudoEvent = {
      target: {
        name: name,
        value: "",
        type: "auto-complete",
        checked: false,
      },
    };
    if (selectedValue) {
      const selectedValueKey = selectedValue[optKey];
      pseudoEvent.target.value = selectedValueKey;
    }

    handleBlur(pseudoEvent);
  };

  const filterOptions = useMemo(() => {
    const unifiedValue = (option) =>
      optFilterKeys?.map((key) => option[key])?.join(" ");

    if (!optFilterKeys) return createFilterOptions();

    return createFilterOptions({
      matchFrom: "any",
      stringify: (option) => unifiedValue(option),
    });
  }, []);

  const selectedValue = useMemo(
    () => icons?.find((opt) => opt[optKey] == value) || null,
    [value, icons]
  );

  const renderOptionWithImage = (props, option) => {
    const { key, ...optionProps } = props;
    const fontSize = isSizeSmall ? "smaller" : "small";
    return (
      <Box
        key={option?.iconSourceId}
        title={option.url}
        component="li"
        {...optionProps}
        fontSize={fontSize}
      >
        <Image
          src={option.url}
          quality={75}
          width={30}
          height={30}
          style={{ borderRadius: "5px", padding: 0 }}
          alt="Icon"
        />

        {option.filecaption}
      </Box>
    );
  };

  const renderInputWithImage = (params) => {
    const imgSize = isSizeSmall ? 20 : 30;
    const inputTitle = selectedValue ? selectedValue[optTitle] : "";
    return (
      <TextField
        {...params}
        key={params.id}
        label={label}
        title={inputTitle}
        slotProps={{
          input: {
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src={
                    selectedValue
                      ? selectedValue[optImage]
                      : "/assets/dashboard-icons/default-card-icon.svg"
                  }
                  quality={75}
                  width={imgSize}
                  height={imgSize}
                  style={{ borderRadius: "5px", padding: 0 }}
                  alt="Icon"
                />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      {showUpload && (
        <>
          <IconUploadModal
            open={openIconUploadModal}
            setOpen={setOpenIconUploadModal}
          />
          <IconButton
            sx={{ padding: "2px", alignSelf: "center" }}
            aria-label="icon-upload"
            color="primary"
            onClick={() => setOpenIconUploadModal(true)}
          >
            <UploadFileIcon />
          </IconButton>
        </>
      )}
      <Autocomplete
        {...helperProps}
        options={icons}
        value={selectedValue}
        onChange={(event, newValue) => handleChangeLocal(newValue)}
        getOptionKey={(opt) => opt[optKey]}
        filterOptions={filterOptions}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onBlur={handleBlurLocal}
        id="Icon-select-demoasdas"
        slotProps={{ popper: { sx: { zIndex: 35001 } } }}
        getOptionLabel={(opt) => opt[optCaption] || ""}
        renderOption={renderOptionWithImage}
        renderInput={renderInputWithImage}
        fullWidth={fullWidth}
      />
    </div>
  );
};

export default IconSelect;
