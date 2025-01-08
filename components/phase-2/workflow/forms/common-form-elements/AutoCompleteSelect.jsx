import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

/**
 *
 * @param {preferences} preferences
 * An Object with two paramaters
 * e.g {key:"workflowId", caption:"workflowName"}
 * key: key to select property which will be sent to backend
 * caption: key to select property to show to the User
 */

const AutoCompleteSelect = ({ mainProps, helperProps }) => {
  const { handleChange, handleBlur, preferences, options, name, value, label } =
    mainProps;
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const optKey = preferences.key;
  const optCaption = preferences.caption;

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

  useEffect(() => {
    const tempSelectedValue = options.find((opt) => opt[optKey] === value);
    setSelectedValue(tempSelectedValue);
  }, [value]);

  return (
    <Autocomplete
      {...helperProps}
      value={selectedValue}
      onChange={(event, newValue) => {
        handleChangeLocal(newValue);
      }}
      getOptionKey={(opt) => opt.id}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onBlur={handleBlurLocal}
      id="controllable-states"
      getOptionLabel={(opt) => opt[optCaption]}
      slotProps={{ popper: { sx: { zIndex: 35001 } } }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} key={params.id} label={label} />
      )}
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
