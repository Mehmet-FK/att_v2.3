import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helpers/ToastNotify";
import { signOut } from "next-auth/react";
import useAxios from "./useAxios";
import { useRef } from "react";

const useAttensamCalls = () => {
  const { axiosWithToken, axiosFormData } = useAxios();
  const dispatch = useDispatch();
  const requestLoadingStack = useRef([]);

  const startRequestAndLoading = (url = "placeholderURL") => {
    dispatch(fetchStart());
    requestLoadingStack.current.push(url);
  };

  const stopRequestAndLoading = () => {
    if (requestLoadingStack.current.length === 1) {
      dispatch(stopLoading());
    }
    requestLoadingStack.current.pop();
  };

  //BASE GET CALL
  const getAttData = async (url, dataName, reduxFlag) => {
    startRequestAndLoading(url);
    try {
      const { data } = await axiosWithToken.get(url);

      if (reduxFlag) {
        dispatch(getSuccess({ data, dataName: dataName }));
      }
      return await data;
    } catch (error) {
      dispatch(fetchFail({ message: error?.response?.status }));
    } finally {
      stopRequestAndLoading();
    }
  };

  //  PUT CALL FOR UPDATE
  const putAttData = async (url, formData) => {
    startRequestAndLoading(url);

    try {
      const { data } = await axiosFormData.put(url, formData);
      // console.log(data);
      toastSuccessNotify(data);
    } catch (error) {
      console.log(error.response);
      toastErrorNotify(error?.response?.data);
    } finally {
      stopRequestAndLoading();
    }
  };

  // DELETE CALL
  const deleteAttData = async (url) => {
    let isSuccess = false;
    startRequestAndLoading(url);
    try {
      const { data } = await axiosWithToken.delete(url);
      toastSuccessNotify(data);
      isSuccess = true;
    } catch (error) {
      console.log(error);
      toastErrorNotify("Etwas ist schiefgelaufen");
    }
    stopRequestAndLoading();
  };

  const deleteWorkflowCall = async (workflowId) => {
    let responseFlag = false;
    startRequestAndLoading();
    try {
      console.log({ workflowId });
      const { data } = await axiosWithToken.post(
        `/atina/api/Workflow/DeleteWorkflow?id=${workflowId}`
      );
      console.log(data);
      toastSuccessNotify("Workflow wurde erfolgreich gelöscht");
      responseFlag = true;
    } catch (error) {
      toastErrorNotify(error?.response?.data || "Etwas ist schiefgelaufen!");
      console.log({ error });
    } finally {
      stopRequestAndLoading();
    }
    return responseFlag;
  };

  //  POST CALL
  const postAttData = async (url, formData) => {
    startRequestAndLoading(url);
    try {
      const { data } = await axiosFormData.post(url, formData);

      toastSuccessNotify("Element wurde erfolgreich angelegt");
    } catch (error) {
      toastErrorNotify(error?.response?.data);
      // console.log(error);
    } finally {
      stopRequestAndLoading();
    }
  };

  //TODO: Refactoring is needed
  const postWorkflowCall = async (formData) => {
    let responseFlag = false;
    startRequestAndLoading();
    try {
      console.log({ POST_Workflow: formData });
      const { data } = await axiosWithToken.post(
        "/atina/api/Workflow/CreateAndUpdateWorkflow",
        formData
      );
      console.log(data);
      toastSuccessNotify("Element wurde erfolgreich angelegt");
      responseFlag = true;
    } catch (error) {
      toastErrorNotify(error?.response?.data);
    } finally {
      stopRequestAndLoading();
    }
    return responseFlag;
  };
  const postEntityCall = async (entityData) => {
    let responseFlag = false;
    startRequestAndLoading();
    try {
      const { data } = await axiosWithToken.post(
        "/api/Entity/CreateAndUpdateEntity",
        entityData
      );
      toastSuccessNotify("Element wurde erfolgreich gespeichert");
      responseFlag = true;
    } catch (error) {
      toastErrorNotify(error?.response?.data || "Etwas ist schiefgelaufen!");
      console.log(error);
    } finally {
      stopRequestAndLoading();
    }
    return responseFlag;
  };

  const uploadNewIconCall = async (iconFormData) => {
    let responseFlag = false;
    startRequestAndLoading();
    try {
      const { data } = await axiosFormData.post(
        "/api/Icon/createAndUpdate",
        iconFormData
      );
      console.log({ iconUploadResponse: data });
      toastSuccessNotify("Icon wurde erfolgreich gespeichert");

      getAllIconsCall();

      responseFlag = true;
    } catch (error) {
      toastErrorNotify(error?.response?.data || "Etwas ist schiefgelaufen!");
      console.log(error);
    } finally {
      stopRequestAndLoading();
    }
    return responseFlag;
  };

  //GET
  const getWorkflowsCall = () =>
    getAttData("/atina/api/Workflow?showPath=true", "workflows", true);
  const getEntitiesCall = () => getAttData("/api/Entity", "entities", true);
  const getWorkflowDefinitionsCall = (workflowId) =>
    getAttData(
      "/atina/api/Workflow/GetWorkflowDefinitions?WorkflowId=" + workflowId,
      "workflowDefinition",
      false
    );
  const getWorkflowHubsCall = () =>
    getAttData(
      "/atina/api/AtinaMasterData/GetWorkflowHubs",
      "workflowHubs",
      true
    );
  const getAllIconsCall = () =>
    getAttData("/api/Icon/getAllIcons", "icons", true);
  const getEntityDefinitionsCall = (entityId) =>
    getAttData(
      `/api/Entity/GetEntityDefinitions?entityId=${entityId}`,
      "entityDefinition",
      false
    );
  const getModulesCall = () =>
    getAttData("/atina/api/Modules", "modules", true);

  const getRecordViewFields = (id) =>
    getAttData(
      `/atina/api/RecordView/GetRecordViewFields?recordViewId=${id}`,
      "rv-fields",
      false
    );

  const getViewsCall = () =>
    getAttData("/api/DatabaseSchema/views", "views", true);
  const getViewColumnsCall = (view) =>
    getAttData(
      `/api/DatabaseSchema/views/${view}/columns`,
      "viewColumns",
      true
    );

  const getFieldTypes = () =>
    getAttData("/api/Enums/fieldtypes", "fieldTypes", true);
  const getViewTypes = () =>
    getAttData("/api/Enums/viewtypes", "viewTypes", true);
  const getLaunchTypes = () =>
    getAttData("/api/Enums/workflowlaunchtypes", "launchTypes", true);

  //POST
  // const postEntityCall = (data) => postAttData("/api/Entity/CreateAndUpdateEntity", data);
  const postFieldCall = (entityId, data) =>
    postAttData(`/api/Field/${entityId}`, data);

  //PUT
  const updateEntityCall = (id, data) => putAttData(`/api/Entity/${id}`, data);
  const updateFieldCall = (id, data) => putAttData(`/api/Field/${id}`, data);

  //DELETE
  const deleteEntityCall = (id) => deleteAttData(`/api/Entity/${id}`);
  const deleteFieldCall = (id) => deleteAttData(`/api/Field/${id}`);
  return {
    getAttData,
    postEntityCall,
    postFieldCall,
    postWorkflowCall,
    getAllIconsCall,
    uploadNewIconCall,

    getWorkflowsCall,
    getWorkflowDefinitionsCall,
    getWorkflowHubsCall,
    getEntityDefinitionsCall,
    getEntitiesCall,

    getRecordViewFields,

    getViewTypes,
    getLaunchTypes,
    getFieldTypes,
    getViewsCall,
    getViewColumnsCall,
    getModulesCall,

    updateFieldCall,
    updateEntityCall,

    deleteWorkflowCall,
    deleteEntityCall,
    deleteFieldCall,
  };
};

export default useAttensamCalls;
