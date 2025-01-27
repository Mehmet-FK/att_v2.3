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

const useAttensamCalls = () => {
  const { axiosWithToken, axiosFormData } = useAxios();
  const { token } = useSelector((state) => state.settings.user);
  const dispatch = useDispatch();

  //BASE GET CALL
  const getAttData = async (url, dataName, reduxFlag) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(url);

      if (reduxFlag) {
        dispatch(getSuccess({ data, dataName: dataName }));
      }
      return await data;
    } catch (error) {
      dispatch(fetchFail({ message: error?.response?.status }));
    } finally {
      dispatch(stopLoading());
    }
  };

  //  PUT CALL FOR UPDATE
  const putAttData = async (url, formData) => {
    dispatch(fetchStart());

    try {
      const { data } = await axiosFormData.put(url, formData);
      // console.log(data);
      toastSuccessNotify(data);
    } catch (error) {
      console.log(error.response);
      toastErrorNotify(error?.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  };

  // DELETE CALL
  const deleteAttData = async (url) => {
    let isSuccess = false;
    try {
      const { data } = await axiosWithToken.delete(url);
      toastSuccessNotify(data);
      isSuccess = true;
    } catch (error) {
      console.log(error);
      toastErrorNotify("Etwas ist schiefgelaufen");
    }
    dispatch(stopLoading());
  };

  //  POST CALL
  const postAttData = async (url, formData) => {
    try {
      const { data } = await axiosFormData.post(url, formData);
      toastSuccessNotify("Element wurde erfolgreich angelegt");
    } catch (error) {
      toastErrorNotify(error?.response?.data);
      // console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  //TODO: Refactoring is needed
  const postWorkflowCall = async (formData) => {
    let responseFlag = false;

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
      dispatch(stopLoading());
    }
    return responseFlag;
  };
  const postEntityCall = async (entityData) => {
    let responseFlag = false;

    try {
      const { data } = await axiosWithToken.post(
        "/api/Entity/CreateAndUpdateEntity",
        entityData
      );
      toastSuccessNotify("Element wurde erfolgreich angelegt");
      responseFlag = true;
    } catch (error) {
      toastErrorNotify(error?.response?.data);
      console.log(error);
    } finally {
      dispatch(stopLoading());
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
  const getEntityDefinitionsCall = (entityId) =>
    getAttData(
      `/api/Entity/GetEntityDefinitions?entityId=${entityId}`,
      "entityDefinition",
      false
    );
  const getModulesCall = () => getAttData("/api/Modules", "modules", true);
  const getSingleEntityCall = (id) =>
    getAttData(`/api/Entity/${id}`, "entity", true);
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

  //TODO: Do not forget to delete
  // const postWorkflowCall = (data) => console.log(data);

  //PUT
  const updateEntityCall = (id, data) => putAttData(`/api/Entity/${id}`, data);
  const updateFieldCall = (id, data) => putAttData(`/api/Field/${id}`, data);

  //DELETE
  const deleteEntityCall = (id) => deleteAttData(`/api/Entity/${id}`);
  const deleteFieldCall = (id) => deleteAttData(`/api/Field/${id}`);
  return {
    postEntityCall,
    postFieldCall,
    postWorkflowCall,

    getWorkflowsCall,
    getWorkflowDefinitionsCall,
    getEntitiesCall,
    getSingleEntityCall,
    getViewTypes,
    getLaunchTypes,
    getFieldTypes,
    getViewsCall,
    getViewColumnsCall,
    getModulesCall,
    getEntityDefinitionsCall,

    updateEntityCall,
    updateFieldCall,

    deleteEntityCall,
    deleteFieldCall,
  };
};

export default useAttensamCalls;
