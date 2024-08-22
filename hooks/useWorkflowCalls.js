import React from "react";

const useWorkflowCalls = () => {
  const { axiosWithToken, axiosFormData } = useAxios();

  const postWorkflowData = async (url, formData) => {
    try {
      const { data } = axiosFormData.post(url, formData);
      console.log(data);
      toastSuccessNotify("Element wurde erfolgreich angelegt");
    } catch (error) {
      console.log(error);
      toastErrorNotify("Etwas ist schiefgelaufen!");
    }
  };

  return {};
};

export default useWorkflowCalls;
