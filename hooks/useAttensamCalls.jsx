import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";

const useAttensamCalls = () => {
  const { axiosWithToken, axiosFormData } = useAxios();
  const dispatch = useDispatch();

  //BASE GET CALL
  const getAttData = async (url, dataName) => {
    let flag = false;

    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(url);

      dispatch(getSuccess({ data, dataName: dataName }));
      flag = true;
    } catch (error) {
      console.log(error);
      dispatch(fetchFail({ message: "" }));
      flag = false;
    } finally {
      dispatch(stopLoading());
    }
    return flag;
  };

  //GET SINGLE ENTITY
  const getSingleEntity_X = async () => {
    try {
      const { data } = await axiosWithToken.get(url);

      flag = true;
    } catch (error) {
      console.log(error);
      flag = false;
    } finally {
    }
    return flag;
  };

  //BASE POST CALL
  const postAttData = async (url, data) => {
    try {
      const res = await axiosFormData.post(url, data);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //GET
  const getEntitiesCall = () => getAttData("Entity", "entities");
  const getSingleEntityCall = (id) => getAttData(`Entity/${id}`, "entity");
  const getViewsCall = () => getAttData("DatabaseSchema/views", "views");
  const getViewColumnsCall = (view) =>
    getAttData(`DatabaseSchema/views/${view}/columns`, "viewColumns");
  //POST
  const createNewEntitCall = (data) => postAttData("Entity", data);

  return {
    createNewEntitCall,
    getEntitiesCall,
    getViewsCall,
    getViewColumnsCall,
    getSingleEntityCall,
  };
};

export default useAttensamCalls;
