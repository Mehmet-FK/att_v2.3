import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helpers/ToastNotify";
import { signOut } from "next-auth/react";

const useAttensamCalls = () => {
  const { axiosWithToken, axiosFormData } = useAxios();
  const { token } = useSelector((state) => state.settings.user);
  const dispatch = useDispatch();

  //BASE GET CALL
  const getAttData = async (url, dataName) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(url);

      dispatch(getSuccess({ data, dataName: dataName }));
    } catch (error) {
      dispatch(fetchFail({ message: error?.response?.status }));
    } finally {
      dispatch(stopLoading());
    }
  };

  // PUT CALL FOR UPDATE
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

  //POST CALL
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

  //GET
  const getEntitiesCall = () => getAttData("Entity", "entities");
  const getModulesCall = () => getAttData("Modules", "modules");
  const getSingleEntityCall = (id) => getAttData(`Entity/${id}`, "entity");
  const getViewsCall = () => getAttData("DatabaseSchema/views", "views");
  const getViewColumnsCall = (view) =>
    getAttData(`DatabaseSchema/views/${view}/columns`, "viewColumns");

  const getFieldTypes = () => getAttData("Enums/fieldtypes", "fieldTypes");
  const getViewTypes = () => getAttData("Enums/viewtypes", "viewTypes");
  const getLaunchTypes = () =>
    getAttData("Enums/workflowlaunchtypes", "launchTypes");

  //POST
  const postEntityCall = (data) => postAttData("Entity", data);
  const postFieldCall = (entityId, data) =>
    postAttData(`Field/${entityId}`, data);

  //TODO: Do not forget to delete
  const postWorkflowCall = (data) => postAttData("Workflow", data);

  //PUT
  const updateEntityCall = (id, data) => putAttData(`Entity/${id}`, data);
  const updateFieldCall = (id, data) => putAttData(`Field/${id}`, data);

  //DELETE
  const deleteEntityCall = (id) => deleteAttData(`Entity/${id}`);
  const deleteFieldCall = (id) => deleteAttData(`Field/${id}`);
  return {
    postEntityCall, //CREATE Entity
    postFieldCall, //CREATE Field
    postWorkflowCall, // CREATE Workflow

    getEntitiesCall, //READ Entities
    getSingleEntityCall, //READ Entity
    getViewTypes, //READ ViewTypes
    getLaunchTypes, //READ Launch Types
    getFieldTypes, //READ FieldTypes
    getViewsCall, //READ Views
    getViewColumnsCall, //READ View Columns
    getModulesCall, // READ Modules

    updateEntityCall, //UPDATE Entity
    updateFieldCall, //UPDATE Field

    deleteEntityCall, //DELETE Entity
    deleteFieldCall, //DELETE Field
  };
};

export default useAttensamCalls;
