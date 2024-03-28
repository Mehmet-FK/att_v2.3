import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helpers/ToastNotify";

const useAttensamCalls = () => {
  const { axiosWithToken, axiosFormData } = useAxios();
  const dispatch = useDispatch();

  //BASE GET CALL
  const getAttData = async (url, dataName) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(url);
      dispatch(getSuccess({ data, dataName: dataName }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail({ message: "" }));
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
      console.log(error.response?.data);
      toastErrorNotify(error.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  };

  // DELETE CALL
  const deleteAttData = async (url) => {
    try {
      const { data } = await axiosFormData.delete(url);
      toastSuccessNotify(data);
    } catch (error) {
      // console.log(error);
      toastErrorNotify(error.response?.data);
    } finally {
      dispatch(stopLoading());
    }
  };

  //POST CALL
  const postAttData = async (url, formData) => {
    try {
      const { data } = await axiosFormData.post(url, formData);
      toastSuccessNotify("Element wurde erfolgreich angelegt");
    } catch (error) {
      toastErrorNotify(error.response?.data);
      // console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  //GET
  const getEntitiesCall = () => getAttData("Entity", "entities");
  const getSingleEntityCall = (id) => getAttData(`Entity/${id}`, "entity");
  const getViewsCall = () => getAttData("DatabaseSchema/views", "views");
  const getViewColumnsCall = (view) =>
    getAttData(`DatabaseSchema/views/${view}/columns`, "viewColumns");

  const getViewTypes = () => getAttData("Enums/viewtypes", "viewTypes");
  const getLaunchTypes = () =>
    getAttData("Enums/workflowlaunchtypes", "launchTypes");

  //POST
  const postEntityCall = (data) => postAttData("Entity", data);
  const postFieldCall = (entityId, data) =>
    postAttData(`Field/${entityId}`, data);

  //PUT
  const updateEntityCall = (id, data) => putAttData(`Entity/${id}`, data);
  const updateFieldCall = (id, data) => putAttData(`Field/${id}`, data);

  //DELETE
  const deleteEntityCall = (id) => deleteAttData(`Entity/${id}`);
  const deleteFieldCall = (id) => deleteAttData(`Field/${id}`);
  return {
    postEntityCall, //CREATE Entity
    postFieldCall, //CREATE Field

    getEntitiesCall, //READ Entities
    getSingleEntityCall, //READ Entity
    getViewTypes, //READ ViewTypes
    getLaunchTypes, //READ Launch Types
    getViewsCall, //READ Views
    getViewColumnsCall, //READ View Columns
    updateEntityCall, //UPDATE Entity
    updateFieldCall, //UPDATE Field
    deleteEntityCall, //DELETE Entity
    deleteFieldCall, //DELETE Field
  };
};

export default useAttensamCalls;
