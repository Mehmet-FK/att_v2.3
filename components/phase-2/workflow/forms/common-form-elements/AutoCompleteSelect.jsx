import { Avatar, Box, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useMemo, useState } from "react";

/**
 *
 * @param {preferences} preferences
 * An Object with two paramaters
 * e.g {
 * @field key: key to select property which will be sent to backend
 * @field title:"A Value to show on hover",
 * @field image:"image path if an image needs to be displayed",
 * @field caption:"workflowName"
 * @field filterKeys:["property","keys","to be", "filtered by"]
 * }
 * caption: key to select property to show to the User
 */
const AutoCompleteSelect = ({ mainProps, helperProps }) => {
  const { handleChange, handleBlur, preferences, options, name, value, label } =
    mainProps;
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const optKey = preferences.key;
  const optCaption = preferences.caption;
  const optImage = preferences.image;
  const optTitle = preferences?.title;
  const optFilterKeys = preferences?.filterKeys;
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
      setSelectedValue(newValue);
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
      pseudoEvent.target.value = selectedValue[optKey];
    }
    handleBlur(pseudoEvent);
  };
  const renderOptionWithImage = (props, option) => {
    const { key, ...optionProps } = props;
    return (
      <Box
        key={key}
        title={optTitle ? option[optTitle] : ""}
        component="li"
        {...optionProps}
      >
        <Avatar
          alt="Image"
          sx={{ width: 24, height: 24, mr: 1 }}
          src={option.icon}
        />
        {option[optKey] + " - " + option[optCaption]}
      </Box>
    );
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

  useEffect(() => {
    const tempSelectedValue = options.find((opt) => opt[optKey] === value);
    setSelectedValue(tempSelectedValue);
  }, [value]);

  return (
    <Autocomplete
      {...helperProps}
      value={selectedValue || ""}
      onChange={(event, newValue) => handleChangeLocal(newValue)}
      getOptionKey={(opt) => opt.id}
      filterOptions={filterOptions}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onBlur={handleBlurLocal}
      id="controllable-states"
      getOptionLabel={(opt) => opt[optCaption] || ""}
      slotProps={{ popper: { sx: { zIndex: 35001 } } }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} key={params.id} label={label} />
      )}
      renderOption={optImage ? renderOptionWithImage : null}
    />
  );
};

export default AutoCompleteSelect;

/* const prepareWorkflowForAutoCompleteSelect = (workflows) => {
  if (!workflows) return [];

  const notDatasetWorkflows = workflows.filter(
    (wf) => wf.launchType !== "0" && wf.launchType !== "1"
  );

  return notDatasetWorkflows.map((wf) => ({
    id: wf.id,
    caption: wf.caption,
    icon: wf.icon,
  }));
}; */
